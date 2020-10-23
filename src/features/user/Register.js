import {Link} from 'react-router-dom'
import React from 'react'
import {Link} from 'react-router-dom'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import {accountService, alertService} from '@/_services'


const Register = ({history}) => {
  const initialValues = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('First Name is required'),
    confirmPassword: Yup.string().required('First Name is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Terms & Conditions is required'),
  });
  
  return (
    <div>
      
    </div>
  )
}

export default Register












//pre formik/redone form that works
// import React, {useState} from 'react'

// import MovieFinder  from "../../apis/MovieFinder";



// const Register = () => {
//     const [registerUsername, setRegisterUsername] = useState('')
//     const [registerPassword, setRegisterPassword] = useState('')
//     const [registerEmail, setRegisterEmail] = useState('')
//      const register = async(registerUsername, registerPassword, registerEmail) => {
//         //Order of params dictates what is used for some reason. Keep an eye out.
//         //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
//         console.log(registerUsername)
//         try {
//           const response = await MovieFinder.post("users", {
//             user_username: registerUsername,
//             user_password: registerPassword,
//             user_email: registerEmail  
//           })
//           console.log(response)
//           console.log("added User to DB")
//         } catch(err) {
//           console.log(err)
//         }
       
//         console.log("adduser fired")
//       }

//     return (
//         <div>
//             <h1>Register</h1>
//             <input placeholder="Username" onChange={e => setRegisterUsername(e.target.value)}/>
//             <input placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}/>
//             <input placeholder="Email" onChange={e => setRegisterEmail(e.target.value)}/>
//             <button onClick={() => register(registerUsername,registerPassword , registerEmail)}>Submit</button>
//         </div>
//     )
// }

// export default Register
