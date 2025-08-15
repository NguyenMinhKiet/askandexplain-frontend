export default interface DecodedTokenType {
    userId: string;
    email: string;
    name: string;
    exp?: number;
    iat?: number;
}
