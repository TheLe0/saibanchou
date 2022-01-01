import { RefreshToken } from '../src/service';
import { v4 as uuid} from 'uuid';

const refreshToken = new RefreshToken();

test('generate token test', () => {
    const token = refreshToken.generateToken(uuid());
    expect(token).toBeDefined();
});

test('verify token expiration test', () => {
    expect(refreshToken.getExpirationSeconds()).toBeDefined();
});