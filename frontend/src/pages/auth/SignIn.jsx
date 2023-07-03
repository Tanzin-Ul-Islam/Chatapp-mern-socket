import React, { useState } from 'react';
import api from "../../config/api.json";
import axios from '../../config/axios.config';
import { Link } from 'react-router-dom';
export default function SignIn() {
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
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' className='block w-full p-2 mb-2 border' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="password" placeholder='password' className='block w-full p-2 mb-2 border' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='bg-blue-500 text-white block w-full rounded-sm p-2 mb-2'>Sign In</button>
                <Link to={'/sign-up'}>Sign up here</Link>
            </form>
        </div>
    )
}
