import React, {useState} from 'react'
import axios from 'axios'

import MovieFinder  from "../../apis/MovieFinder";

const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
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
            <h1>Register</h1>
            <input placeholder="Username" onChange={e => setRegisterUsername(e.target.value)}/>
            <input placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}/>
            <input placeholder="Email" onChange={e => setRegisterEmail(e.target.value)}/>
            <button onClick={() => register(registerUsername,registerPassword , registerEmail)}>Submit</button>
        </div>
    )
}

export default Register
