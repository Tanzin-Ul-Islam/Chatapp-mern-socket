import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../ContextProvider';

export default function AuthGuard({ children }) {
    const navigate = useNavigate();
    const { token } = useContext(DataContext);
    useEffect(() => {
        if (!token) {
            navigate('/sign-in');
        }
    }, [])
    return (
        <>{children}</>
    )
}
