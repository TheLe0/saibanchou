import { JsonWebToken } from '../src/utils';

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
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMZW9uYXJkbyBCZXJ0ZWxlIFRvc2luIiwiZW1haWwiOiJsZW9iLnRvc2luQGhvdG1haWwuY29tIiwicm9sZSI6InN5c2FkbWluIn0sImlhdCI6MTYzOTk0MDUzOSwiZXhwIjoxNjQwMDI1MTM5fQ.jxOkqHZVujxQu_g6WJyyndUohUHe063zgURhSdBj8tE";
    
    token = jwt.extractToken(token);

    expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMZW9uYXJkbyBCZXJ0ZWxlIFRvc2luIiwiZW1haWwiOiJsZW9iLnRvc2luQGhvdG1haWwuY29tIiwicm9sZSI6InN5c2FkbWluIn0sImlhdCI6MTYzOTk0MDUzOSwiZXhwIjoxNjQwMDI1MTM5fQ.jxOkqHZVujxQu_g6WJyyndUohUHe063zgURhSdBj8tE");
});

test('token header extraction test', async () => {
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMZW9uYXJkbyBCZXJ0ZWxlIFRvc2luIiwiZW1haWwiOiJsZW9iLnRvc2luQGhvdG1haWwuY29tIiwicm9sZSI6InN5c2FkbWluIn0sImlhdCI6MTYzOTk0MDUzOSwiZXhwIjoxNjQwMDI1MTM5fQ.jxOkqHZVujxQu_g6WJyyndUohUHe063zgURhSdBj8tE";
    
    const extractedUser = await jwt.extractUserFromToken(token);

    expect(extractedUser).toStrictEqual(user);
});

