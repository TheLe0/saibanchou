import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaFactory } from '../data';
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
        this.prisma = PrismaFactory.getInstance();
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

    public async findByEmail(email: string) :Promise<UserModel> {

        const user = await this.prisma.user.findUnique({
            select: {
                email: true,
                name: true,
                role: true
            },
            where: {
                email: email
            },
        });

        return user;
    }

    public async listAll() : Promise<UserModel[]>{

        const users = await this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                role: true
            }
        });

        return users;
    }

    public async listByRole(role: string) : Promise<UserModel[]>{

        const users = await this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                role: true
            },
            where: {
                role: role
            }
        });

        return users;
    }

    public async updateUser(user: UserModel, email: string) :Promise<UserModel> {

        const updatedUser = await this.prisma.user.update({
            where: {
              email: email,
            },
            data: {
              name: user.name,
              role: user.role,
              email: user.email
            },
        });

        return updatedUser;
    }
    
    public async deleteUserByEmail(email: string) :Promise<boolean> {

        const deleteUser = await this.prisma.user.delete({
            where: {
              email: email,
            },
        })

        return (deleteUser != undefined);
    }

    public async changePassword(email: string, oldPassword: string, newPassword: string) :Promise<boolean> {

        const user = await this.prisma.user.findUnique({
            select: {
              password: true,  
            },
            where: {
              email: email,
            },
        });

        const match = await crypt.decrypt(user.password, oldPassword);

        if (!match) {
            return false;
        }

        const hash = await crypt.encrypt(newPassword);

        const updatedUser = await this.prisma.user.update({
            where: {
              email: email,
            },
            data: {
                password: hash
            },
        });

        if (updatedUser == undefined) {
            return false;
        }

        return true;
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