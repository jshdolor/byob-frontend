import React, { Component } from 'react';
import UpdatePasswordForm from 'components/forms/UpdatePasswordForm/UpdatePasswordForm';
import { Container } from 'react-bootstrap';
class UpdatePasswordTPL extends Component {
  state = {};
  render() {
    return (
      <div className='signup-container'>
        <Container>
          <h4 className='signup-title'>Update Password</h4>
          <p>
            Already have an account?{' '}
            <a href='#' className='login-btn'>
              Login
            </a>
          </p>
          <div className='form-container'>
            <UpdatePasswordForm></UpdatePasswordForm>
          </div>
        </Container>
      </div>
    );
  }
}

export default UpdatePasswordTPL;
