import * as dotenv from "dotenv";

dotenv.config()

export default {
    APP_PORT: process.env.PORT,
    VERSION_API: process.env.VERSION,
    USER_ROLE: process.env.USER_ROLE,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ELASTIC_URL: process.env.ELASTIC_URL_NODE1,
    MONGODB_URL: process.env.MONGODB_URL,
    // @ts-ignore
    SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    JWT_ALGORITHM: process.env.ALGORITHM_JWT,
    // @ts-ignore
    JWT_EXPIRATION_TIMES: parseInt(process.env.EXPIRATION_TIMES_JWT)
}