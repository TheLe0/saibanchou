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

    public async validateToken(user: UserModel, token: string) :Promise<boolean> {
     
        const decoded = await jwt.verify(token, this.secret);

        if ((decoded.exp * 1000)<= Date.now())
        {
            return false;
        }
        else if (decoded.user.name != user.name ||  decoded.user.email != user.email ||  decoded.user.role != user.role)
        {
            return false;
        }

        return true;
        
    }
}