import * as dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
    Secret: process.env.JWT_SECRET,
    Expiration: process.env.JWT_EXPIRATION
}