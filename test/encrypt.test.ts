import { Crypt } from '../src/utils';

const crypt = new Crypt();
const inputString = "leonardo";

test('encrypt leonardo word test', async () => {
    const hash = await crypt.encrypt(inputString);
    expect(hash).toBeDefined();
});

test('decrupt leonardo word test', async () => {
    const hash = await crypt.encrypt(inputString);
    const match = await crypt.decrypt(hash, inputString);

    expect(match).toBe(true);
});