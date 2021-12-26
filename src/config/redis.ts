import * as dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
    Host: process.env.REDIS_HOST ?? "localhost",
    Port: process.env.REDIS_PORT ?? 6379,
    Password: process.env.REDIS_PASS,
    Database: process.env.REDIS_DB ?? 0,
    ExpireMode: process.env.REDIS_EXPIRATION_MODE,
    TimeToExpire: parseInt(process.env.REDIS_TIME_TO_EXPIRE)
}