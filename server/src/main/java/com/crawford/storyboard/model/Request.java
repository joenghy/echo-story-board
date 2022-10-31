package com.crawford.storyboard.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table
public class Request {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;
    private Integer storyId;
    private String storyTitle;
    private Integer type;
    @CreationTimestamp
    private Timestamp createdAt;
}