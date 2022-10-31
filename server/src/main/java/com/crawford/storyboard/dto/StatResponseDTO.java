package com.crawford.storyboard.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Map;

@Data
public class StatResponseDTO {
    private Map<Timestamp, Integer> views;
    private Map<Timestamp, Integer> downloads;
    private Integer code;
    private String msg;
}