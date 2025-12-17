import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { pb } from '../services/pb';
import { loginUser, logoutUser, registerUser, getCurrentUser } from '../services/users';
import type { User } from '../types/pocketbase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setLoading(false);

        // Listen for auth changes
        pb.authStore.onChange((token: string, model: any) => {
            setUser(model as User | null);
        });
    }, []);

    const login = async (email: string, password: string) => {
        const authData = await loginUser(email, password);
        setUser(authData.record as User);
    };

    const register = async (email: string, password: string, name: string) => {
        const newUser = await registerUser(email, password, name, 'client');
        // Auto-login after registration
        await login(email, password);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isStaff: user?.role === 'staff' || user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

