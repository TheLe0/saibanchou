import { JsonWebToken } from '../src/service';

const jwt = new JsonWebToken();
const user = { 
    name: "Leonardo Bertele Tosin", 
    email: "leob.tosin@hotmail.com",
    role: "sysadmin"
}

test('generate JWT test', async () => {
    const token = await jwt.generateToken(user);
    expect(token).toBeDefined();
});


test('verify JWT test', async () => {
    const token = await jwt.generateToken(user);
    const match = await jwt.validateToken(token);

    expect(match).toBe(true);
});

test('token header extraction test', async () => {
    let token = await jwt.generateToken(user);
    let header = "Bearer " + token;
    
    let newToken = jwt.extractToken(header);

    expect(newToken).toBe(token);
});

test('token header extraction test', async () => {
    let token = await jwt.generateToken(user);
    let header = "Bearer " + token;

    const extractedUser = await jwt.extractUserFromToken(header);

    expect(extractedUser).toStrictEqual(user);
});

