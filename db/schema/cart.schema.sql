CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    cart_price INT NOT NULL,
    product_id INT,
    product_count INT DEFAULT 1,
    user_id INT,
    vendor_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendor_profiles(id)
);