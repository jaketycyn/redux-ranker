import React from 'react';
import {Link} from 'react-router-dom'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {accountService, alertService} from '@/_services';

function Login({history, location}) {
  const initialvalues = {
    //possible addition of username later
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  function onSubmit({email, password}, {setSubmitting}) {
    alertService.clear();
    accountService.login(email, password)
      .then(() => {
        const { from } = location.state || { from: {pathname: "/"} };
        history.push(from);
        })
        .catch(error => {
          setSubmitting(false);
          alertService.error(error);
        });
      }

    return (
      <Formik initialvalues={initialvalues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({errors, touched, isSubmitting}) => (
          <Form>
            <h3>Login</h3>
            <div>
              <div>
                <label>Email</label>
                <Field name='email' type='text' className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name='email' component='div' className='invalid-feedback' />
              </div>
              <div>
                <label>Password</label>
                <Field name='password' type='password' className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name='password' component='div' className='invalid-feedback' />
              </div>
              <div>
                <button type='submit' disabled={isSubmitting}>
                  {isSubmitting && <span>Spinner</span>}
                </button>
                <Link to='register'>Register</Link>
              </div>
              <div>
                <Link to='forgot-password'>Forgot Password?</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
}

export {Login}