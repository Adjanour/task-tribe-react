import { useState } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContext {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    register: (username: string, email: string, password: string) => void;
}

const initialUser: User | null = null;

const useAuth = (): AuthContext => {
    const [user, setUser] = useState<User | null>(initialUser);

    const login = (username: string, password: string) => {
        // Perform authentication logic here (e.g., API call)
        // If successful, update the user state
        const authenticatedUser: User = {
            id: 1,
            username,
            email: 'user@example.com',
        };

        setUser(authenticatedUser);
    };

    const logout = () => {
        // Perform logout logic here (e.g., clear authentication tokens)
        setUser(null);
    };

    const register = (username: string, email: string, password: string) => {
        // Perform registration logic here (e.g., API call)
        // If successful, update the user state
        const registeredUser: User = {
            id: 2,
            username,
            email,
        };

        setUser(registeredUser);
    };

    return {
        user,
        login,
        logout,
        register,
    };
};

export default useAuth;
