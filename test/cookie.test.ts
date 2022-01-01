import { CookieUtil } from '../src/util';

const cookie = "foo=bar; bar=foo"
const cookies = CookieUtil.parseCookiesToMap(cookie);

console.log(cookies);

test('cookie map length test', () => {
    expect(cookies.size).toBe(2);
});

test('cookie map values test', () => {
    expect(cookies.get('foo')).toBe('bar');
    expect(cookies.get('bar')).toBe('foo');
});