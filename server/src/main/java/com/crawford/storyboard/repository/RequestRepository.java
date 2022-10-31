package com.crawford.storyboard.repository;

import com.crawford.storyboard.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    @Query(value = "select created_at from Request q where q.story_title = ?1 and q.type = 0", nativeQuery = true)
    List<Timestamp> getViewsByTitle(String title);

    @Query(value = "select created_at from Request q where q.story_title = ?1 and q.type = 1", nativeQuery = true)
    List<Timestamp> getDownloadsByTitle(String title);
}