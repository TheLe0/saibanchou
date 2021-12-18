import { JsonWebToken } from '../src/utils';

const jwt = new JsonWebToken();
const user = { 
    id: "123e4567-e89b-12d3-a456-426655440000", 
    name: "TheLe0",
    role: "sysadmin"
}

test('generate JWT test', async () => {
    const token = await jwt.generateToken(user);
    expect(token).toBeDefined();
});
