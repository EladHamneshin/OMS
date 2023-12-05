import React, { createContext, useState } from 'react';
import { User } from './types/userAdmin';
import { logOutApi, login } from './api/usersAPI';

interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: User | null;
    loginUser: (email: string, password: string) => Promise<User>;
    logoutUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const initialUserInfo = localStorage.getItem('admin')
        ? JSON.parse(localStorage.getItem('admin')!)
        : undefined;

    const [userInfo, setUserInfo] = useState<User | null>(initialUserInfo);

    const loginUser = async (email: string, password: string) => {
        try {
            const loggedUser = await login({ email, password });
            localStorage.setItem('admin', JSON.stringify(loggedUser));
            setUserInfo(loggedUser);
            return loggedUser;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await logOutApi();
            localStorage.removeItem('admin');
            localStorage.removeItem('omsToken');
            setUserInfo(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ userInfo, logoutUser, loginUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
