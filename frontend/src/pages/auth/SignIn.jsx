import React, { useContext, useState, useEffect } from 'react';
import api from "../../config/api.json";
import axios from '../../config/axios.config';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../ContextProvider';
export default function SignIn() {

    const navigate = useNavigate();

    const { token, setToken, setName, setUserId } = useContext(DataContext)

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {
                userName: userName,
                password: password,
            }
            await axios.post(api.auth.signIn, payload).then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("name", data.user.userName);
                    localStorage.setItem("userId", data.user._id);
                    setToken(data.token);
                    setName(data.user.userName);
                    setUserId(data.user._id);
                    navigate('/')
                }
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [])
    return (
        <div className="bg-blue-100 h-screen flex items-center">
            <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' className='block w-full p-2 mb-2 border' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="password" placeholder='password' className='block w-full p-2 mb-2 border' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='bg-blue-500 text-white block w-full rounded-sm p-2 mb-2'>Sign In</button>
                <Link to={'/sign-up'}>Sign up here</Link>
            </form>
        </div>
    )
}
