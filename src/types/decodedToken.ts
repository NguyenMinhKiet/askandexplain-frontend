export default interface DecodedToken {
    userId: string;
    email: string;
    name: string;
    exp?: number;
    iat?: number;
}
