import React, { Component } from 'react';
import { Formik } from 'formik';
import loginFormSchema from 'config/forms/schema/loginFormSchema';
import { Form, Input } from 'formik-antd';
import { Button, Spin } from 'antd';
import Router from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CookieManager from '~/lib/CookieManager';

import { loginUser } from '~/store/session/actions';

import LoginRequest from '~/services/Authentication/requests/LoginRequest';
import LoginService from '~/services/Authentication/LoginService';
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormSubmitting: false,
            apiMessage: false,
            initialForm: {
                email: '',
                password: '',
            },
        };
    }

    componentDidMount() {}

    async handleFormSubmit(values, resetForm) {
        this.setState({ ...this.state, isFormSubmitting: true });
        const loginRequest = new LoginRequest(values);
        try {
            const { access_token } = await LoginService.handle(loginRequest);
            CookieManager.set('b-at', access_token);
            this.props.loginUser(true);

            resetForm(this.state.initialForm);
            this.setState({
                ...this.state,
                apiMessage: false,
            });

            Router.replace('/');
        } catch (e) {
            const errors = e.getErrors();
            this.setState({
                ...this.state,
                apiMessage: { success: false, messages: errors },
            });
        }
        this.setState({ ...this.state, isFormSubmitting: false });
    }

    render() {
        return (
            <Spin spinning={this.state.isFormSubmitting}>
                <Formik
                    initialValues={this.state.initialForm}
                    validationSchema={loginFormSchema}
                    onSubmit={(values, { resetForm }) =>
                        this.handleFormSubmit(values, resetForm)
                    }
                >
                    {(props) => (
                        <Form
                            onChange={() =>
                                this.setState({
                                    ...this.state,
                                    apiMessage: false,
                                })
                            }
                        >
                            <Form.Item name='email'>
                                <Input
                                    name='email'
                                    className='px-3 py-3'
                                    placeholder='Username / Email'
                                />
                            </Form.Item>

                            <Form.Item name='password'>
                                <Input
                                    name='password'
                                    type='password'
                                    className='px-3 py-3'
                                    placeholder='Password*'
                                />
                            </Form.Item>

                            {this.state.apiMessage ? (
                                <Form.Item
                                    validateStatus={
                                        this.state.apiMessage.success
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={this.state.apiMessage.messages.map(
                                        (msg) => (
                                            <p>{msg}</p>
                                        )
                                    )}
                                ></Form.Item>
                            ) : (
                                ''
                            )}

                            <button
                                type='submit'
                                className='btn py-3 px-3 btn-primary btn-block'
                                disabled={this.state.isFormSubmitting}
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </Spin>
        );
    }
}

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

// import React, { useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Router from 'next/router';
// import { loginUser } from '~/store/session/actions';
// import { setCartItems } from '~/store/cart/actions';

// import LoginRequest from '~/services/Authentication/requests/LoginRequest';
// import LoginService from '~/services/Authentication/LoginService';

// import SetCartRequest from '~/services/Cart/requests/SetCartRequest';
// import CartService from '~/services/Cart/CartService';

// import CookieManager from '~/lib/CookieManager';
// import ClientStorage from '~/lib/ClientStorage';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// const LoginForm = (props) => {
//     const { handleSubmit, register, errors } = useForm();

//     const [hasErrors, setErrors] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [apiErrors, setApiErrors] = useState([]);

//     const formComponent = useRef(null);

//     const onSubmit = (values) => {
//         setErrors(!!Object.keys(errors).length);

//         setIsLoading(true);
//         const request = new LoginRequest(values);
//         LoginService.handle(request).then(async (res) => {
//             setIsLoading(false);
//             if (res.getErrors) {
//                 setApiErrors(res.getErrors());
//                 return;
//             }

//             CookieManager.set('b-at', res.access_token);
//             props.loginUser(true);
//             formComponent.current.reset();

//             const localCart = ClientStorage.get('cart') || [];
//             let cart = [];
//             if (localCart.length > 0) {
//                 const localCartRequest = new SetCartRequest(localCart);
//                 cart = await CartService.setCart(localCartRequest);
//             } else {
//                 cart = await CartService.getCart();
//             }
//             debugger;
//             props.setCartItems(cart.map((d) => d.toJSON()));

//             // Router.push('/');
//         });
//     };

//     const handleFormChange = (v) => {
//         setApiErrors([]);
//     };

//     return (
//         <Form
//             onSubmit={handleSubmit(onSubmit)}
//             onChange={handleFormChange}
//             noValidate
//             validated={hasErrors}
//             ref={formComponent}
//         >
//             <div className='form-group'>
//                 <Input
//                     className={`form-control ${
//                         errors.email ? 'is-invalid' : ''
//                     } `}
//                     placeholder='Username / Email'
//                     name='email'
//                     ref={register({
//                         required: 'Email is required',
//                         pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: 'Invalid email address',
//                         },
//                     })}
//                 />
//                 {/* <Form.Control.Feedback type='invalid'>
//                     {errors.email && errors.email.message}
//                 </Form.Control.Feedback> */}
//             </div>
//             <div className='form-group'>
//                 <Input
//                     className={`form-control ${
//                         errors.password ? 'is-invalid' : ''
//                     } `}
//                     placeholder='Password'
//                     type='password'
//                     name='password'
//                     ref={register({
//                         required: 'Password is required',
//                     })}
//                 />
//                 {/* <Form.Control.Feedback type='invalid'>
//                     {errors.password && errors.password.message}
//                 </Form.Control.Feedback> */}
//             </div>
//             <div className='form-group'>
//                 {apiErrors.map((error, i) => (
//                     <div className='invalid-feedback d-block' key={i}>
//                         {error}
//                     </div>
//                 ))}
//                 <button
//                     className='btn btn-primary btn-block'
//                     disabled={isLoading}
//                 >
//                     Login
//                 </button>
//             </div>
//         </Form>
//     );
// };

// const mapStateToProps = function (state) {
//     return state;
// };

// const mapDispatchToProps = function (dispatch) {
//     return bindActionCreators(
//         {
//             loginUser,
//             setCartItems,
//         },
//         dispatch
//     );
// };
// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
