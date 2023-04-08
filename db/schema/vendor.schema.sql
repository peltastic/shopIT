CREATE TABLE vendor_profile(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_name VARCHAR(20) NOT NULL,
    vendor_products_count INT NOT NULL DEFAULT 0,
    total_products_sold INT NOT NULL DEFAULT 0,
    address TEXT NOT NULL,
    amount_earned INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);