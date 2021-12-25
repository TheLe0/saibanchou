import Redis, { RedisOptions } from 'ioredis'
import { RedisVars } from '../config';

export default class RedisClient {

    private static instance : Redis.Redis;

    private constructor() { }

    private static loadOptions(): RedisOptions {
        const options: RedisOptions = {
            host: RedisVars.Host,
            port: Number(RedisVars.Port),
            db: Number(RedisVars.Database),
        }

        if (RedisVars.Password)
        {
            options.password = RedisVars.Password;
        }

        return options;
    }

    public static getInstance(): Redis.Redis {

        if (!this.instance) {
            this.instance = new Redis(RedisClient.loadOptions());
   
        }

        return this.instance;
    }
}