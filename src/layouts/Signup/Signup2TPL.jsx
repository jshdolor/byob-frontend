import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import FinalRegistrationForm from 'components/forms/FinalRegistrationForm/FinalRegistrationForm';

class Signup2TPL extends Component {
  state = {};

  render() {
    const { touched } = this.props;
    console.log(touched);
    return (
      <div className='signup-container'>
        <Container>
          <h4 className='signup-title'>Set Password</h4>
          <p>
            Already have an account?{' '}
            <a href='#' className='login-btn'>
              Login
            </a>
          </p>
          <div className='form-container'>
            <FinalRegistrationForm></FinalRegistrationForm>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup2TPL;
