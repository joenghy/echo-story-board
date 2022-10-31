package com.crawford.storyboard.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Story {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;
    private String title;
    private String uri;
    private Integer views;
    private Integer downloads;
    private String type;
    private Long size;

    public Story(String title, String uri, Integer views, Integer downloads, String type, Long size) {
        this.title = title;
        this.uri = uri;
        this.views = views;
        this.downloads = downloads;
        this.type = type;
        this.size = size;
    }

    public Story() {

    }
}