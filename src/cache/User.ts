import BaseCache  from './BaseCache';
import { UserModel } from '../model';

export default class User extends BaseCache {

    constructor() {
        super();
    }

    public async addUser(user: UserModel) {

        await BaseCache.redis.set(
            user.email, 
            JSON.stringify(user), 
            BaseCache.expiryMode,
            BaseCache.time
        );
    }

    public async findUser(email: string) :Promise<UserModel> {

        var json = await BaseCache.redis.get(email);

        return JSON.parse(json) as UserModel;
    }
}