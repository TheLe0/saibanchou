import { PrismaClient, Prisma } from '@prisma/client'
import { v4 as uuid} from 'uuid';
import { UserModel } from '../model';
import BaseRepository  from './BaseRepository';
import { Crypt } from '../utils';
import { JsonWebToken } from '../utils';

const crypt = new Crypt();

export default class User extends BaseRepository {

    private readonly prisma: PrismaClient;

    constructor() {  
        super();
        this.prisma = new PrismaClient();
    }

    public async createNewUser(user: UserModel, password: string) :Promise<UserModel> {
        
        const encryptedPassword = await crypt.encrypt(password);

        try {
            const newUser = await this.prisma.user.create({
                data: {
                    id: uuid(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    password: encryptedPassword
                },
            });

            return { 
                name: newUser.name, 
                email: newUser.email,
                role: newUser.role
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    super.error = {
                        message: "E-mail already in use!",
                        code: 409
                    }
                }
            }
            super.logError(e);
        }
    }

    public async userExists(user: UserModel) : Promise<boolean> {

        const foundUser = await this.prisma.user.count({
            where: {
                email: user.email,
                name: user.name,
                role: user.role
              },
        });

        return (foundUser > 0);
    }

    public async login(email: string, password: string) :Promise<string> {

        let token = undefined;
        const jwt = new JsonWebToken();

        const user = await this.prisma.user.findUnique({
            where: {
              email: email,
            },
        });

        if (user != undefined) {

            if (crypt.decrypt(user.password, password))
            {
                const userHash = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

                token = await jwt.generateToken(userHash);
            }
        }

        return token;
    }
}