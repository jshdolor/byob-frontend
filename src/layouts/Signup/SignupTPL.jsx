import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import InitialRegistrationForm from '../../components/forms/InitialRegistrationForm/InitialRegistrationForm';

class SignupTPL extends Component {
  state = {};

  render() {
    return (
      <div className='signup-container'>
        <Container>
          <h4 className='signup-title'>Signup</h4>
          <p>
            Already have an account?{' '}
            <a href='#' className='login-btn'>
              Login
            </a>
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
