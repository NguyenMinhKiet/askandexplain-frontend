import type { UserType } from '~/types';

export default interface DecodedToken {
    id: number;
    user: UserType;
    exp?: number;
    iat?: number;
}
