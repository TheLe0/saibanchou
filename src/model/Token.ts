export default interface Token {
    refreshToken: string;
    userId: string;
    device: string;
    expiration: Date;
}