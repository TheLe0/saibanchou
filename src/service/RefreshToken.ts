import crypto from 'crypto';
import { RefreshTokenVars } from '../config';
import { UserRepository, TokenRepository } from '../repository';
import { TokenModel } from '../model';

export default class RefreshToken {

    private tokenLenght: number;
    private tokenExpiration: number;

    constructor() {
        this.tokenExpiration = parseInt(RefreshTokenVars.Expiration);
        this.tokenLenght = parseInt(RefreshTokenVars.Length);
    }

    public generateToken(userId: string) :string {
        const token = userId + crypto.randomBytes(this.tokenLenght).toString("hex");

        return token;
    }

    public getExpirationSeconds() :Date {
        return new Date(Date.now() + this.tokenExpiration);
    }

    private async getUserId(email: string) :Promise<string> {
        const repository = new UserRepository();

        const userId = await repository.getUserIdByEmail(email);

        return userId;
    }

    public async storeToken(email: string) :Promise<boolean> {

        const userId = await this.getUserId(email);

        if (!userId) {
            return false;
        }

        const repository = new TokenRepository();
        
        let token :TokenModel = {
            refreshToken: this.generateToken(userId),
            userId: userId,
            device: "API",
            expiration: this.getExpirationSeconds()
        }

        token = await repository.createNewToken(token);

        if (!token) {
            return false;
        }

        return true;
    }
}