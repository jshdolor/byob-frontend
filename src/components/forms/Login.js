import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Router from 'next/router';
import { loginUser } from '~/store/session/actions';

import LoginRequest from '~/services/Authentication/requests/LoginRequest';
import LoginService from '~/services/Authentication/LoginService';

import CookieManager from '~/lib/CookieManager';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LoginForm = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const [hasErrors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState([]);

    const formComponent = useRef(null);

    const onSubmit = (values) => {
        setErrors(!!Object.keys(errors).length);

        setIsLoading(true);
        const request = new LoginRequest(values);
        LoginService.handle(request).then((res) => {
            setIsLoading(false);
            if (res.getErrors) {
                setApiErrors(res.getErrors());
                return;
            }

            CookieManager.set('b-at', res.access_token);
            props.loginUser(true);
            formComponent.current.reset();
            Router.push('/');
        });
    };

    const handleFormChange = (v) => {
        setApiErrors([]);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleFormChange}
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
                {apiErrors.map((error, i) => (
                    <div className='invalid-feedback d-block' key={i}>
                        {error}
                    </div>
                ))}
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

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            loginUser,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
