import dotenv from "dotenv"

dotenv.config()

export default {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    email_service: process.env.EMAIL_SERVICE,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    email: process.env.EMAIL
}