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
    const defaultUser = { _id: '', name: 'Ẩn danh', email: '' };
    const [user, setUser] = useState<UserType>(defaultUser);
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        setToken(localStorage.getItem('token') || '');
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<DecodedTokenType>(token);
                setUser({ _id: decoded.userId, email: decoded.email, name: decoded.name });
            } catch (err) {
                console.error('Error: ', err);
                console.error('Invalid token');
            }
        }
    }, [token]);

    const login = (newToken: string) => {
        try {
            const decoded = jwtDecode<DecodedTokenType>(newToken);
            localStorage.setItem('token', newToken);
            setUser({ _id: decoded.userId, email: decoded.email, name: decoded.name });
            setToken(newToken);
            setIsLogin(true);
        } catch (err) {
            console.error('Error: ', err);
            console.error('Invalid login token');
        }
    };

    const logout = () => {
        setUser(defaultUser);
        localStorage.removeItem('token');
        setToken('');
        setIsLogin(false);
    };

    return <AuthContext.Provider value={{ isLogin, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
