CREATE TABLE vendor_profile(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_name VARCHAR(20) NOT NULL,
    vendor_products_count INT NOT NULL,
    total_products_sold INT NOT NULL,
    amount_earned INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);