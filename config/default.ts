import dotenv from "dotenv"

dotenv.config()

export default {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    database_url: process.env.DB_URL,
    port: process.env.DB_PORT,
    email_service: process.env.EMAIL_SERVICE,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    email: process.env.EMAIL,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
    paystack_hostname: process.env.PAYSTACK_HOSTNAME,
    paystack_port: process.env.PAYSTACK_PORT,
    paystack_secret_key: process.env.PAYSTACK_SECRET_KEY,
    
}