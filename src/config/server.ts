import * as dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
    Server: process.env.SERVER ?? '127.0.0.1',
    Port: process.env.PORT ?? '3000'
}