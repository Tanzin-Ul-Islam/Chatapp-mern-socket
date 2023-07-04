import { createContext, useState } from "react";

export const DataContext = createContext(null);

export default function ContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [name, setName] = useState(localStorage.getItem('name') ? localStorage.getItem('name') : null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : null);
    return (
        <DataContext.Provider value={{
            token, setToken,
            name, setName,
            userId, setUserId,
        }}>
            {children}
        </DataContext.Provider>
    )
}
