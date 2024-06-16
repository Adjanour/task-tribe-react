// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebase';
// import { User, onAuthStateChanged, signOut } from 'firebase/auth';

interface AuthContextType {
    // currentUser: User | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState<User | null>(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//         });

//         return unsubscribe;
//     }, []);

//     const logout = async () => {
//         await signOut(auth);
//     };

//     return (
//         <AuthContext.Provider value={{ currentUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
