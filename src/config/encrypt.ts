import * as dotenv from 'dotenv';

dotenv.config();

export const encryptConfig = {
    Salt: process.env.SALT
}