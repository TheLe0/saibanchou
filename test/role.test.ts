import { Role, isValidRole } from '../src/model';

test('role is defined test', () => {
    expect(isValidRole("sysadmin")).toBe(true);
});

test('role is defined test', () => {
    expect(isValidRole("unknown")).toBe(false);
});

test('compare role value to string test', () => {
    expect("sysadmin" == Role.SYSADMIN).toBe(true);
    expect("admin" == Role.ADMIN).toBe(true);
    expect("moderator" == Role.MODERATOR).toBe(true);
    expect("user" == Role.USER).toBe(true);
    expect("guest" == Role.GUEST).toBe(true);
});