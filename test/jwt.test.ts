import { JsonWebToken } from '../src/utils';

const jwt = new JsonWebToken();
const user = { 
    name: "Leonardo Bertele Tosin", 
    email: "lbtosin@ucs.br",
    role: "sysadmin"
}

test('generate JWT test', async () => {
    const token = await jwt.generateToken(user);
    expect(token).toBeDefined();
});


test('verify JWT test', async () => {
    const token = await jwt.generateToken(user);
    const match = await jwt.validateToken(user, token);

    expect(match).toBe(true);
});

