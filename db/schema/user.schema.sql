CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password CHAR(100) NOT NULL,
    role ENUM('USER', 'ADMIN', 'VENDOR') DEFAULT 'USER',
    name VARCHAR(20) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_code INT,
    password_reset_code INT
);
