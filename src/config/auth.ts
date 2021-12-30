import * as dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
    PrivateKey: process.env.JWT_PRIVATE_KEY,
    PublicKey: process.env.JWT_PUBLIC_KEY,
    Algorithm: process.env.JWT_ALGORITHM,
    Expiration: process.env.JWT_EXPIRATION
}