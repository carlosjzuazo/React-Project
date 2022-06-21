CREATE DATABASE IF NOT EXISTS linkproject;

use linkproject;

CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        bio VARCHAR(200),
        password VARCHAR(30) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(200) NOT NULL,
        url VARCHAR(200),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
