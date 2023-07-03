import { createContext, useState } from "react";

export const DataContext = createContext(null);

export default function ContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [userDetails, setUserDetails] = useState(null)
    return (
        <DataContext.Provider value={{
            token, setToken,
        }}>
            {children}
        </DataContext.Provider>
    )
}
