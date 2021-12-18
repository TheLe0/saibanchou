import { 
    ServerVars, 
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

test('load database env vars test', () => {
    expect(DatabaseVars.Url).toBeDefined();
});

test('load auth env vars test', () => {
    expect(AuthVars.Secret).toBeDefined();
    expect(AuthVars.Expiration).toBeDefined();  
});