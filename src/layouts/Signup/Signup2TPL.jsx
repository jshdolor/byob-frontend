import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import FinalRegistrationForm from 'components/forms/FinalRegistrationForm/FinalRegistrationForm';
import Link from 'next/link';

class Signup2TPL extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='signup-container'>
        <Container>
          <h4 className='signup-title'>Set Password</h4>
          <div className='form-container'>
            <FinalRegistrationForm {...this.props}></FinalRegistrationForm>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup2TPL;
