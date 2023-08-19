CREATE TABLE vendor_profiles(
    id SERIAL PRIMARY KEY,
    user_id INT,
    email VARCHAR(50) NOT NULL,
    vendor_name VARCHAR(20) NOT NULL,
    vendor_products_count INT NOT NULL DEFAULT 0,
    total_products_sold INT NOT NULL DEFAULT 0,
    addresses TEXT NOT NULL,
    amount_earned INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);