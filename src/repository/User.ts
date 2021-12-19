import { PrismaClient, Prisma } from '@prisma/client'
import { v4 as uuid} from 'uuid';
import { UserModel } from '../model';
import BaseRepository  from './BaseRepository';

export default class User extends BaseRepository {

    private readonly prisma: PrismaClient;

    constructor() {  
        super();
        this.prisma = new PrismaClient();
    }

    public async createNewUser(user: UserModel) :Promise<UserModel> {
        
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    id: uuid(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
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
        }
    }

}