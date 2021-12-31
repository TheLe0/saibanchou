import * as dotenv from 'dotenv';

dotenv.config();

export const refreshTokenConfig = {
    Length: process.env.REFRESH_TOKEN_LENGTH,
    Expiration: process.env.REFRESH_TOKEN_EXPIRATION
}