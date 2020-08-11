import React, { Component } from 'react';
import { Formik } from 'formik';
import ContactFormSchema from 'config/forms/schema/ContactFormSchema';
import { Form, Input } from 'formik-antd';
import { Button } from 'antd';

const { TextArea } = Input;

class ContactForm extends Component {
  state = {};
  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={ContactFormSchema}
        onSubmit={this.handleFormSubmit}
      >
        {(props) => (
          <Form>
            <Form.Item name='name'>
              <Input name='name' placeholder='Name*' />
            </Form.Item>

            <Form.Item name='email'>
              <Input name='email' placeholder='Email*' />
            </Form.Item>

            <Form.Item name='message'>
              <TextArea name='message' placeholder='Message*' autoSize={{ minRows: 4, maxRows: 6 }} />
            </Form.Item>

            <p className='contact-terms'>
              By clicking the "Submit" button, I hereby agree to the use of my Customer Information as provided in its <a href='#'> Privacy Policy</a>
            </p>
            <Button type='primary' htmlType='submit' className='submit-btn'>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ContactForm;
