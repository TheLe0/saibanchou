import { RedisClient } from '../data';
import { RedisVars } from '../config';

export default abstract class BaseCache {

    protected static redis = RedisClient.getInstance();
    protected static expiryMode = RedisVars.ExpireMode;
    protected static time = RedisVars.TimeToExpire;
}