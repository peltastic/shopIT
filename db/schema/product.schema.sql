CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    names VARCHAR(255) NOT NULL,
    descriptions TEXT NOT NULL,
    price INT NOT NULL,
    category ENUM("tech", "clothes", "cosmetics", "food", "drinks", "wine", "tech accessories"),
    image_url JSON,
    vendor_id INT,
    FOREIGN KEY (vendor_id) REFERENCES vendor_profiles(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);