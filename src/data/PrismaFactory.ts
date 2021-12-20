import { PrismaClient } from '@prisma/client'

export default class PrismaFactory {

    private static instance: PrismaClient;

    private constructor() { }

    public static getInstance(): PrismaClient {
        if (process.env.NODE_ENV === 'production') {
            this.instance = new PrismaClient()
        } else {
            if (!global.prisma) {
              global.prisma = new PrismaClient()
            }

            this.instance = global.prisma
        }

        return this.instance;
    }
}