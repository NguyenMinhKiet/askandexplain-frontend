import { jwtDecode } from 'jwt-decode';
import { type DecodedToken } from '../types';

export function decodeToken(token: string): DecodedToken {
    return jwtDecode(token);
}
