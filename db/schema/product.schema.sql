CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    flags ENUM("tech", "clothes", "cosmetics", "food", "drinks", "wine"),
    image_url JSON,
    vendor_id INT,
    FOREIGN KEY (vendor_id) REFERENCES vendor_profile(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);