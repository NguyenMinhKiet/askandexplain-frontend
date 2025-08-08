import type { UserType } from '~/types';
export default interface AuthContextType {
    isLogin: boolean;
    user: UserType | null;
    login: (token: string) => void;
    logout: () => void;
}
