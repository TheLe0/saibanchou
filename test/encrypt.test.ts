import { Crypt } from '../src/service';

const crypt = new Crypt();
const inputString = "leonardo";

test('encrypt string test', async () => {
    const hash = await crypt.encrypt(inputString);
    expect(hash).toBeDefined();
});

test('compare original and encripted string', async () => {
    const hash = await crypt.encrypt(inputString);
    const match = await crypt.decrypt(hash, inputString);

    expect(match).toBe(true);
});

test('compare original and encrypted strings, different words', async () => {
    const hash = await crypt.encrypt("leandro");
    const match = await crypt.decrypt(hash, inputString);

    expect(match).toBe(false);
});