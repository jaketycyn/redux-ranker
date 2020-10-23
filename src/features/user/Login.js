import React, {useState} from 'react'

import MovieFinder  from "../../apis/MovieFinder";

const Login = () => {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    
    const login = async(registerUsername, registerPassword, registerEmail) => {
        //Order of params dictates what is used for some reason. Keep an eye out.
        //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
        console.log(registerUsername
          )
        try {
          const response = await MovieFinder.get("users", {
            user_username: loginUsername,
            user_password: loginPassword,
          })
          console.log(response)
          console.log("added User to DB")``
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
