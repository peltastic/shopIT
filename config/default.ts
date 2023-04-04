import dotenv from "dotenv"

dotenv.config()

export default {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT 
}