package com.crawford.storyboard.service;

import com.crawford.storyboard.dto.StatResponseDTO;
import com.crawford.storyboard.dto.StatusResponseDTO;
import com.crawford.storyboard.dto.UploadResponseDTO;
import com.crawford.storyboard.exception.FileStorageException;
import com.crawford.storyboard.exception.FileNotFoundException;
import com.crawford.storyboard.model.Access;
import com.crawford.storyboard.model.Request;
import com.crawford.storyboard.model.Story;
import com.crawford.storyboard.property.FileStorageProperty;
import com.crawford.storyboard.repository.RequestRepository;
import com.crawford.storyboard.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

@Service
public class StoryService {
    private final Path fileStorageLocation;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    public StoryService(FileStorageProperty fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored. " + e.getMessage());
        }
    }

    public UploadResponseDTO storeFile(MultipartFile file) {
        UploadResponseDTO uploadResponseDTO = new UploadResponseDTO();
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName + ".");
            }
            if (storyRepository.findIdByTitle(fileName) != null) {
                throw new FileStorageException("Story with the same name already exist.");
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/story/")
                    .path(fileName)
                    .toUriString();

            Story story = new Story(fileName, fileDownloadUri, 0, 0, file.getContentType(), file.getSize());
            storyRepository.save(story);
            uploadResponseDTO.setStory(story);
            uploadResponseDTO.setCode(0);
            uploadResponseDTO.setMsg("Upload story successfully.");
        } catch (FileStorageException e) {
            uploadResponseDTO.setCode(1);
            uploadResponseDTO.setMsg("Could not store file " + fileName + ". " + e.getMessage());
        } catch (Exception e) {
            uploadResponseDTO.setCode(2);
            uploadResponseDTO.setMsg(e.getMessage());
        }
        return uploadResponseDTO;
    }

    public ResponseEntity<Resource> downloadFile(String fileName, HttpServletRequest request, Integer type) throws IOException {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                // Try to determine file's content type
                String contentType = null;
                contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

                // Fallback to the default content type if type could not be determined
                if(contentType == null) {
                    contentType = "application/octet-stream";
                }


                Request req = new Request();
                req.setStoryId(storyRepository.findIdByTitle(fileName));
                req.setType(type);
                req.setStoryTitle(fileName);
                requestRepository.save(req);
                if (type.equals(Access.Type.VIEW.ordinal())) {
                    storyRepository.increaseViewsByTitle(fileName);
                } else if (type.equals(Access.Type.DOWNLOAD.ordinal())) {
                    storyRepository.increaseDownloadsByTitle(fileName);
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public StatusResponseDTO getStatus() {
        StatusResponseDTO statusResponseDTO = new StatusResponseDTO();
        try {
            statusResponseDTO.setStories(storyRepository.findAll());
            statusResponseDTO.setCode(0);
            statusResponseDTO.setMsg("Get story board status successfully.");
        } catch (Exception e) {
            statusResponseDTO.setCode(1);
            statusResponseDTO.setMsg("Failed to get story board status. " + e.getMessage());
        }
        return statusResponseDTO;
    }

    public StatResponseDTO getStoryStat(String fileName) {
        StatResponseDTO statResponseDTO = new StatResponseDTO();
        try {
            List<Timestamp> views = requestRepository.getViewsByTitle(fileName);
            List<Timestamp> downloads = requestRepository.getDownloadsByTitle(fileName);
            TreeMap<Timestamp, Integer> viewsMap = new TreeMap<>();
            TreeMap<Timestamp, Integer> downloadsMap = new TreeMap<>();
            views.stream().map(timestamp -> roundTimestampToNearestHour(timestamp))
                    .forEach(ts -> {
                        Integer count = viewsMap.get(ts);
                        viewsMap.put(ts, count == null ? 1 : count + 1);
                    });
            downloads.stream().map(timestamp -> roundTimestampToNearestHour(timestamp))
                    .forEach(ts -> {
                        Integer count = downloadsMap.get(ts);
                        downloadsMap.put(ts, count == null ? 1 : count + 1);
                    });
            statResponseDTO.setViews(viewsMap);
            statResponseDTO.setDownloads(downloadsMap);
            statResponseDTO.setCode(0);
            statResponseDTO.setMsg("Get story stat successfully.");
        } catch (Exception e) {
            statResponseDTO.setCode(1);
            statResponseDTO.setMsg("Failed to get story stat for " + fileName + ". " + e.getMessage());
        }
        return statResponseDTO;
    }

    private Timestamp roundTimestampToNearestHour(Timestamp timestamp) {
        return Timestamp.from(Instant.ofEpochMilli(((timestamp.getTime()+1800000)/(3600000))*(3600000)));
    }
}