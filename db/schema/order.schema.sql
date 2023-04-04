CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    product_id BIGINT,
    vendor_id BIGINT,
    user_id BIGINT,
    FOREIGN KEY (product_id) REFERENCES products(id)
    FOREIGN KEY (vendor_id) REFERENCES vendor_profile(id)
    FOREIGN KEY (user_id) REFERENCES users(id)
)