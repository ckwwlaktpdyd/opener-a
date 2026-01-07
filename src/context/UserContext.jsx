import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userCans, setUserCans] = useState(10);

    const useCan = () => {
        if (userCans > 0) {
            setUserCans(prev => prev - 1);
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ userCans, setUserCans, useCan }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
}
