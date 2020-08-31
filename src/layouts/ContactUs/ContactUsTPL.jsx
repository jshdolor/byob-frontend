import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ContactForm from 'components/forms/ContactForm/ContactForm';
import { Row, Col } from 'antd';

class UpdatePasswordTPL extends Component {
  state = {};
  render() {
    return (
      <div className='contact-container'>
        <div className='form-container'>
          <ContactForm></ContactForm>
        </div>

        <div className='contact-info'>
          <p>We will get back to you as soon as possible</p>
          <Row align='bottom'>
            <Col span={14}>
              <div className='info-cont'>
                <h5 className='info-title'>General Inquiry</h5>
                <p>info@domain.com</p>
              </div>
              <div className='info-cont'>
                <h5 className='info-title'>Press and Media</h5>
                <p>press@domain.com</p>
              </div>
              <div className='info-cont'>
                <h5 className='info-title'>Office Address</h5>
                <p>Unit 1234 Building Name Corner Street Avenue, Barangay Village, Anywhere City Philippines 10am - 6pm</p>
              </div>
            </Col>
            <Col span={10} className='contact-image-cont'>
              <img className='contact-logo' src='/images/contact.png' alt='logo' />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UpdatePasswordTPL;
