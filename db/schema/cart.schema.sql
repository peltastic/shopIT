CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    product_id BIGINT,
    FOREIGN KEY (product_id) REFERENCES products(id)
)