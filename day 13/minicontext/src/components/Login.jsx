import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import UserContext from '../context/UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({username, password});
    }
    return (
        <div>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login