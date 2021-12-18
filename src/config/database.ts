import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    Url: process.env.DATABASE_URL
}