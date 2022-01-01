import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaFactory } from '../data';
import BaseRepository  from './BaseRepository';
import { TokenModel } from '../model';
import { v4 as uuid} from 'uuid';
import { refreshTokenConfig } from '../config/refreshToken';

export default class User extends BaseRepository {

    private readonly prisma: PrismaClient;

    constructor() {  
        super();
        this.prisma = PrismaFactory.getInstance();
    }

    public async createNewToken(token: TokenModel) :Promise<TokenModel> {

        const newToken = await this.prisma.token.create({
            data: {
                id: uuid(),
                refreshToken: token.refreshToken,
                userId: token.userId,
                device: token.device,
                expiration: token.expiration
            },
        });

        return { 
            refreshToken: newToken.refreshToken,
            userId: newToken.userId,
            device: newToken.device,
            expiration: newToken.expiration
        }
    }
}