import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
    username: string;
    email?: string;
    exp?: number;
    iat?: number;
    // Thêm field khác nếu token có
}

export function decodeToken(token: string): DecodedToken {
    return jwtDecode(token);
}
