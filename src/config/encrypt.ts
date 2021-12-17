import * as dotenv from 'dotenv';

dotenv.config();

export const encryptConfig = {
    Hash: process.env.HASH,
    Salt: process.env.SALT
}