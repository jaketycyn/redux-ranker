import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '../../_services';

function Update({ history }) {
    const user = accountService.userValue;
    const initialValues = {
        username: user.username, 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    }

    
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
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required')
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')       
    });

    function onSubmit(fields, { setStatus, setSubmitting}) {
        setStatus();
        accountService.update(user.id, fields)
            .then(() => {
                alertService.success('Update successful', {keepAfterRouteChange: true});
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Are you sure?')) {
            setIsDeleted(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'));
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Update Profile</h1>
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
                        <h3>Change Password</h3>
                        <p>Leave blank to keep the same password</p>
                        <div>
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
                            <button type='submit' disabled={isSubmitting}>
                                {isSubmitting && <span>Spinner</span>}
                            </button>
                            <button type='button' onClick={() => onDelete()} style={{ width: '75px'}} disabled={isDeleting}>
                                {isDeleting
                                    ? <span>Spinner</span>
                                    : <span>Delete</span>
                                }
                            </button>
                            <Link to='.'>Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export {Update}