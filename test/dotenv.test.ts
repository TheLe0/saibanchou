import { 
    ServerVars,
    SuperUserVars, 
    EncryptVars, 
    AuthVars, 
    DatabaseVars,
    RedisVars ,
    RefreshTokenVars
} from '../src/config';

test('load server env vars test', () => {
    expect(ServerVars.Server).toBeDefined();
    expect(ServerVars.Port).toBeDefined();
});

test('load encrypt env vars test', () => {
    expect(EncryptVars.Salt).toBeDefined();
});

test('load super user env vars test', () => {
    expect(SuperUserVars.Name).toBeDefined();
    expect(SuperUserVars.Email).toBeDefined();
    expect(SuperUserVars.Password).toBeDefined();
});

test('load database env vars test', () => {
    expect(DatabaseVars.Url).toBeDefined();
});

test('load redis env vars test', () => {
    expect(RedisVars.Host).toBeDefined();
    expect(RedisVars.Port).toBeDefined();
    expect(RedisVars.Password).toBeDefined();
    expect(RedisVars.Database).toBeDefined();
    expect(RedisVars.ExpireMode).toBeDefined();
    expect(RedisVars.TimeToExpire).toBeDefined();
});

test('load auth env vars test', () => {
    expect(AuthVars.Algorithm).toBeDefined();
    expect(AuthVars.PublicKey).toBeDefined();
    expect(AuthVars.PrivateKey).toBeDefined();
    expect(AuthVars.Expiration).toBeDefined();  
});

test('load refresh tokens env vars test', () => {
    expect(RefreshTokenVars.Expiration).toBeDefined();
    expect(RefreshTokenVars.Length).toBeDefined();
});