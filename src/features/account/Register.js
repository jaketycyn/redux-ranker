import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


//import {accountService, alertService} from '@/_services'


const Register = ({history}) => {
  const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('First Name is required'),
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const onSubmit = (fields, {setStatus, setSubmitting}) => {
    setStatus();
  }

  return (
    <Formik initialvalues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {({errors, touched, isSubmitting})=> (
      <Form>
        <h3>Register</h3>
          <div>
            <div>
              <div>
                <label>Username</label>
                <Field name='username' type='text' className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                <ErrorMessage name='username' component='div' className='invalid-feedback' />
              </div>
              <div>
                <label>First Name</label>
                <Field name='firstName' type='text' className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                <ErrorMessage name='firstName' component='div' className='invalid-feedback' />
              </div>
              <div>
                <label>Last Name</label>
                <Field name='lastName' type='text' className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                <ErrorMessage name='lastName' component='div' className='invalid-feedback' />
              </div>
              <div>
                <label>Email</label>
                <Field name='email' type='text' className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name='email' component='div' className='invalid-feedback' />
              </div>
              <div >
                <label>Password</label>
                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div>
                <label>Confirm Password</label>
                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              <div>
                <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
              </div>
              <div>
                <button type='submit' disabled={isSubmitting}>
                  {isSubmitting && <span>Spinner</span>}
                  Register
                </button>
                <Link to='login'>Cancel</Link> 
              </div>
            </div>
          </div>
      </Form>
    )} 
      
    </Formik>
  )
}

export {Register}












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
