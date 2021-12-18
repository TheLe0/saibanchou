import { AuthVars } from '../config';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model';

export default class JsonWebToken {

    private secret: string;
    private expiration: number;

    constructor() {
        this.secret =  AuthVars.Secret;
        this.expiration = parseInt(AuthVars.Expiration);
    }

    public async generateToken(user: UserModel) :Promise<string> {

        return await jwt.sign({user}, this.secret, {
            expiresIn: this.expiration
        });
    }
}