package com.crawford.storyboard.dto;

import com.crawford.storyboard.model.Story;
import lombok.Data;

@Data
public class UploadResponseDTO {
    private Story story;
    private Integer code;
    private String msg;
}
