import crypto from 'crypto';
import { RefreshTokenVars } from '../config';

export default class RefreshToken {

    private tokenLenght: number;
    private tokenExpiration: number;

    constructor() {
        this.tokenExpiration = parseInt(RefreshTokenVars.Expiration);
        this.tokenLenght = parseInt(RefreshTokenVars.Length);
    }

    public generateToken() :string {
        const token = crypto.randomBytes(this.tokenLenght).toString("hex");

        return token;
    }

    public getExpirationSeconds() :Date {
        return new Date(Date.now() + this.tokenExpiration);
    }
}