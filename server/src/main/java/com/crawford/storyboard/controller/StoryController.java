package com.crawford.storyboard.controller;

import com.crawford.storyboard.dto.StatResponseDTO;
import com.crawford.storyboard.dto.StatusResponseDTO;
import com.crawford.storyboard.dto.UploadResponseDTO;
import com.crawford.storyboard.model.Access;
import com.crawford.storyboard.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("api")
public class StoryController {
    @Autowired
    private StoryService storyService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/story")
    @ResponseStatus(HttpStatus.CREATED)
    private UploadResponseDTO uploadStory(@RequestParam("file") MultipartFile file) {
        return storyService.storeFile(file);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/story/{fileName:.+}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Resource> viewStory(@PathVariable String fileName, HttpServletRequest request) throws IOException {
        return storyService.downloadFile(fileName, request, Access.Type.VIEW.ordinal());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/story/download/{fileName:.+}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Resource> downloadStory(@PathVariable String fileName, HttpServletRequest request) throws IOException {
        return storyService.downloadFile(fileName, request, Access.Type.DOWNLOAD.ordinal());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/story/status")
    @ResponseStatus(HttpStatus.OK)
    public StatusResponseDTO getStatus() {
        return storyService.getStatus();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/story/stat/{fileName:.+}")
    @ResponseStatus(HttpStatus.OK)
    public StatResponseDTO getStoryStat(@PathVariable String fileName) {
        return storyService.getStoryStat(fileName);
    }
}