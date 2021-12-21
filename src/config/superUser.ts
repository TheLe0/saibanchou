import * as dotenv from 'dotenv';

dotenv.config();

export const superUserConfig = {
    Email: process.env.SUPER_USER_EMAIL,
    Name: process.env.SUPER_USER_NAME,
    Password: process.env.SUPER_USER_PASSWORD
}