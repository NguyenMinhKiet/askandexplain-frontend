import { jwtDecode } from 'jwt-decode';
import { type DecodedTokenType } from '../types';

export function decodeToken(token: string): DecodedTokenType {
    return jwtDecode(token);
}
