import React, {useState} from 'react'
import axios from 'axios';
const Login = () => {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    
    const register = async(registerUsername, registerPassword, registerEmail) => {
        //Order of params dictates what is used for some reason. Keep an eye out.
        //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
        console.log(registerUsername
          )
        try {
          const response = await MovieFinder.post("users", {
            user_username: registerUsername,
            user_password: registerPassword,
            user_email: registerEmail  
          })
          console.log(response)
          console.log("added User to DB")
        } catch(err) {
          console.log(err)
        }
       
        console.log("adduser fired")
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
