import { RefreshToken } from '../src/service';

const refreshToken = new RefreshToken();

test('generate token test', () => {
    const token = refreshToken.generateToken();
    expect(token).toBeDefined();
});

test('verify token expiration test', () => {
    expect(refreshToken.getExpirationSeconds()).toBeDefined();
});