CREATE TABLE users (
    id PRIMARY KEY SERIAL,
    email VARCHAR(50) NOT NULL,
    passwords CHAR(100) NOT NULL,
    roles JSON,
    names VARCHAR(20) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_code INT,
    password_reset_code INT
);
