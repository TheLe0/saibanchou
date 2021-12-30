import { AuthVars } from '../config';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model';

export default class JsonWebToken {

    private publicKey: string;
    private privateKey: string;
    private algorithm: string;
    private expiration: number;
    private user: UserModel;
    private tokenExpiration: number;

    constructor() {
        this.publicKey = AuthVars.PublicKey;
        this.privateKey = AuthVars.PrivateKey;
        this.algorithm = AuthVars.Algorithm;
        this.expiration = parseInt(AuthVars.Expiration);
        this.user = undefined;
        this.tokenExpiration = undefined;
    }

    public extractToken(authHeader: string) :string {
        if (authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7, authHeader.length);
       } else {
          return undefined;
       }
    }

    public extractUserFromToken(authHeader: string) :Promise<UserModel> {

        const token = this.extractToken(authHeader);

        if (token != undefined) {
            return this.getUserFromToken(token);
        }
    }

    public async generateToken(user: UserModel) :Promise<string> {

        return await jwt.sign({user}, this.privateKey, {
            expiresIn: this.expiration,
            algorithm: this.algorithm
        });
    }

    private async decodeToken(token: string) {

        const decoded = await jwt.verify(token, this.publicKey, {
            algorithms: this.algorithm
        });

        this.user =  {
            name: decoded.user.name,
            email: decoded.user.email,
            role: decoded.user.role
        }

        this.tokenExpiration = decoded.exp;
    }

    public async validateToken(token: string) :Promise<boolean> {
     
        await this.decodeToken(token);

        if ((this.tokenExpiration * 1000)<= Date.now())
        {
            return false;
        }

        return true;
        
    }

    public async getUserFromToken(token?: string): Promise<UserModel> {

        if (this.user == undefined && token != undefined)
        {
            await this.decodeToken(token);
        }

        return this.user;
    }
}