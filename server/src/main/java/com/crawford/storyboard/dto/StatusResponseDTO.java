package com.crawford.storyboard.dto;

import com.crawford.storyboard.model.Story;
import lombok.Data;

import java.util.List;

@Data
public class StatusResponseDTO {
    private List<Story> stories;
    private Integer code;
    private String msg;
}