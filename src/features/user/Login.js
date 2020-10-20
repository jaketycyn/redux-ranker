import React, {useState} from 'react'
import axios from 'axios';
const Login = () => {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const login = () => {
        axios({
            method: "post",
        data: {
            username: loginUsername,
            password: loginPassword
        },
        withCredentials: true,
        url: "http://localhost:5000/login"
        }).then((res) => console.log(res));
    }
    const getUser = () => {
        axios({
            method: "GET",
            data: {
            
            }
            
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
            <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
