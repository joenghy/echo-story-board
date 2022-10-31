package com.crawford.storyboard.repository;

import com.crawford.storyboard.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

@Transactional
public interface StoryRepository extends JpaRepository<Story, Integer> {
    @Query(value = "select id from Story s where s.title = ?1", nativeQuery = true)
    Integer findIdByTitle(String title);

    @Query(value = "select uri from Story s where s.title = ?1", nativeQuery = true)
    String  findUriByTitle(String title);

    @Modifying
    @Query(value = "update story s set views = views + 1 where s.title = ?1", nativeQuery = true)
    void increaseViewsByTitle(String title);

    @Modifying
    @Query(value = "update story s set downloads = downloads + 1 where s.title = ?1", nativeQuery = true)
    void increaseDownloadsByTitle(String title);
}