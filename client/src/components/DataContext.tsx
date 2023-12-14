import React, { createContext, useContext, ReactNode, useState } from 'react';
import order from "../types/orderType";

interface DataContextProps {
    order: order[];
    setOrders: React.Dispatch<React.SetStateAction<order[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [order, setOrders] = useState<order[]>([]);

    return (
        <DataContext.Provider value={{ order, setOrders }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};