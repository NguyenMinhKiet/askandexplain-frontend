import { createContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { DecodedTokenType, AuthContextType, UserType } from '../types';

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props type for provider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedTokenType>(token);
                setUser(decoded.user);
            } catch (err) {
                console.error('Error: ', err);
                console.error('Invalid token');
                logout();
            }
        }
    }, []);

    const login = (token: string) => {
        try {
            const decoded = jwtDecode<DecodedTokenType>(token);
            localStorage.setItem('token', token);
            setUser(decoded.user);
        } catch (err) {
            console.error('Error: ', err);
            console.error('Invalid login token');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const isLogin = !!user;

    return <AuthContext.Provider value={{ isLogin, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
