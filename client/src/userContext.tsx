import React, { createContext, useState } from 'react';
import { User } from './types/user';
import { logOutApi, login } from './api/usersAPI';


interface UserContextProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    userInfo: User | undefined;
    loginUser: (email: string, password: string) => Promise<User>;
    logoutUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
    const initialUserInfo = localStorage.getItem('admin')
        ? JSON.parse(localStorage.getItem('admin')!)
        : undefined

    const [userInfo, setUserInfo] = useState<User | undefined>(initialUserInfo);



    const loginUser = async (email: string, password: string) => {
        const loggedUser = await login({ email, password });

        const adminResponse = loggedUser.isAdmin
        localStorage.setItem("admin", JSON.stringify(adminResponse))
        localStorage.setItem('admin', JSON.stringify(adminResponse));
        setUserInfo(loggedUser);
        return loggedUser;
    }



const logoutUser = async () => {
    await logOutApi();
    localStorage.removeItem('admin');
    setUserInfo(undefined);
}

return (
    <UserContext.Provider value={{ userInfo, logoutUser, loginUser }}>
        {props.children}
    </UserContext.Provider>
);
};
export default UserContextProvider;