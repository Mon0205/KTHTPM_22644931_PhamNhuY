CREATE DATABASE cms_microkernel;
USE cms_microkernel;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE plugins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  is_enabled BOOLEAN DEFAULT TRUE
);

INSERT INTO themes (name, is_active) VALUES
('Light', true),
('Dark', false);

INSERT INTO plugins (name, is_enabled) VALUES
('posts', true),
('themes', true),
('plugin-manager', true);