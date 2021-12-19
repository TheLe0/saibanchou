import { AuthVars } from '../config';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model';

export default class JsonWebToken {

    private secret: string;
    private expiration: number;
    private user: UserModel;
    private tokenExpiration: number;

    constructor() {
        this.secret =  AuthVars.Secret;
        this.expiration = parseInt(AuthVars.Expiration);
        this.user = undefined;
        this.tokenExpiration = undefined;
    }

    public async generateToken(user: UserModel) :Promise<string> {

        return await jwt.sign({user}, this.secret, {
            expiresIn: this.expiration
        });
    }

    private async decodeToken(token: string) {

        const decoded = await jwt.verify(token, this.secret);

        this.user =  {
            name: decoded.user.name,
            email: decoded.user.email,
            role: decoded.user.role
        }

        this.tokenExpiration = decoded.exp;
    }

    public async validateToken(user: UserModel, token: string) :Promise<boolean> {
     
        await this.decodeToken(token);

        if ((this.tokenExpiration * 1000)<= Date.now())
        {
            return false;
        }
        else if (this.user.name != user.name ||  this.user.email != user.email ||  this.user.role != user.role)
        {
            return false;
        }

        return true;
        
    }
}