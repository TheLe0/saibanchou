import * as dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
    Host: process.env.REDIS_HOST ?? "localhost",
    Port: process.env.REDIS_PORT ?? 6379,
    Password: process.env.REDIS_PASS,
    Database: process.env.REDIS_DB ?? 0
}