import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import LoginRequest from '~/services/Authentication/requests/LoginRequest';
import LoginService from '~/services/Authentication/LoginService';

const LoginForm = () => {
    const { handleSubmit, register, errors } = useForm();

    const [hasErrors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formComponent = useRef(null);

    const onSubmit = (values) => {
        setErrors(!!Object.keys(errors).length);

        setIsLoading(true);
        const request = new LoginRequest(values);
        LoginService.handle(request).then((d) => {
            formComponent.current.reset();
            console.log(d);
            setIsLoading(false);
        });
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            validated={hasErrors}
            ref={formComponent}
        >
            <div className='form-group'>
                <input
                    className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                    } `}
                    placeholder='Username / Email'
                    name='email'
                    ref={register({
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.email && errors.email.message}
                </Form.Control.Feedback>
            </div>
            <div className='form-group'>
                <input
                    className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                    } `}
                    placeholder='Password'
                    type='password'
                    name='password'
                    ref={register({
                        required: 'Password is required',
                    })}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.password && errors.password.message}
                </Form.Control.Feedback>
            </div>
            <div className='form-group'>
                <button
                    className='btn btn-primary btn-block'
                    disabled={isLoading}
                >
                    Login
                </button>
            </div>
        </Form>
    );
};

export default LoginForm;
