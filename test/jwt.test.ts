import { JsonWebToken } from '../src/utils';

const jwt = new JsonWebToken();
const user = { 
    id: "123e4567-e89b-12d3-a456-426655440000", 
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

