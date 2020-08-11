import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import InitialRegistrationForm from '../../components/forms/InitialRegistrationForm/InitialRegistrationForm';
import Link from 'next/link';

class SignupTPL extends Component {
    state = {};

    render() {
        return (
            <div className='signup-container'>
                <Container>
                    <h4 className='signup-title'>Signup</h4>
                    <p>
                        Already have an account?{' '}
                        <Link href='/login'>
                            <a href='#' className='login-btn'>
                                Login
                            </a>
                        </Link>
                    </p>
                    <div className='form-container'>
                        <InitialRegistrationForm></InitialRegistrationForm>
                    </div>
                </Container>
            </div>
        );
    }
}

export default SignupTPL;
