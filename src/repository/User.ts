import { PrismaClient, Prisma } from '@prisma/client'
import { UserCache } from '../cache';
import { PrismaFactory } from '../data';
import { v4 as uuid} from 'uuid';
import { UserModel } from '../model';
import BaseRepository  from './BaseRepository';
import { Crypt } from '../service';
import { JsonWebToken } from '../service';

const crypt = new Crypt();
const cache = new UserCache();

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

            await cache.addUser(newUser);

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

        const user_cache = await cache.findUser(user.email);
        
        if (user_cache != null) {
            return true;
        }

        const foundUser = await this.prisma.user.count({
            where: {
                email: user.email,
                name: user.name,
                role: user.role,
                active: true
            },
        });

        if (foundUser > 0) {

            await cache.addUser(user);

            return true;
        }

        return false;
    }

    public async findByEmail(email: string) :Promise<UserModel> {

        const user = await this.prisma.user.findFirst({
            select: {
                email: true,
                name: true,
                role: true
            },
            where: {
                email: email,
                active: true
            },
        });

        if (user != null) {
            await cache.addUser(user);
        }
        
        return user;
    }

    public async listAll() : Promise<UserModel[]>{

        const users = await this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                role: true,
                active: true
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
                role: role,
                active: true
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

        await cache.addUser(updatedUser);

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

        const user = await this.prisma.user.findFirst({
            where: {
              email: email,
              active: true
            },
        });

        await cache.addUser(user);

        if (user != undefined) {

            if (await crypt.decrypt(user.password, password))
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