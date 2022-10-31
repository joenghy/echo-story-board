package com.crawford.storyboard;

import com.crawford.storyboard.property.FileStorageProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperty.class
})
public class StoryboardApplication {
	public static void main(String[] args) {
		SpringApplication.run(StoryboardApplication.class, args);
	}
}