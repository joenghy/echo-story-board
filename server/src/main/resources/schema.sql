DROP TABLE IF EXISTS story;
CREATE TABLE story (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    uri VARCHAR(1024),
    views INT,
    downloads INT,
    type VARCHAR(100),
    size INT
);

DROP TABLE IF EXISTS request;
CREATE TABLE request (
    id INT PRIMARY KEY,
    story_id INT,
    story_title VARCHAR(100),
    type INT,
    created_at TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
);