export enum Role {
    SYSADMIN = 'sysadmin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
    GUEST = 'guest'
}

export function isValidRole(role: string) :boolean {

    switch (role) {
        case Role.SYSADMIN:
        case Role.ADMIN:
        case Role.MODERATOR:
        case Role.USER:
        case Role.GUEST:
            return true;
        default:
            return false;
    }
}
