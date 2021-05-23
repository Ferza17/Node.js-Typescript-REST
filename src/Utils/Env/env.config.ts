import * as dotenv from "dotenv";

dotenv.config()

export default {
    APP_PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ELASTIC_URL: process.env.ELASTIC_URL,
    MONGODB_URL: process.env.MONGODB_URL
}