import { 
    ServerVars,
    SuperUserVars, 
    EncryptVars, 
    AuthVars, 
    DatabaseVars 
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

test('load auth env vars test', () => {
    expect(AuthVars.Secret).toBeDefined();
    expect(AuthVars.Expiration).toBeDefined();  
});