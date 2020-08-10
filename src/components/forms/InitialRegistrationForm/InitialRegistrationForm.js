import React, { Component } from 'react';
import { Formik } from 'formik';
import initialRegistrationFormSchema from 'config/forms/schema/initialRegistrationFormSchema';
import { Form, Input } from 'formik-antd';
import { Button } from 'antd';

class InitialRegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormSubmitting: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={initialRegistrationFormSchema}
        onSubmit={this.handleFormSubmit}
      >
        {(props) => (
          <Form>
            <Form.Item name='firstName' className='name'>
              <Input name='firstName' placeholder='First Name*' />
            </Form.Item>

            <Form.Item name='lastName' className='name -last'>
              <Input name='lastName' placeholder='Last Name*' />
            </Form.Item>

            <Form.Item name='email'>
              <Input name='email' placeholder='Email*' />
            </Form.Item>

            <Form.Item name='address1'>
              <Input name='address1' placeholder='Address Line 1' />
            </Form.Item>

            <Form.Item name='address2'>
              <Input name='address2' placeholder='Address Line 2' />
            </Form.Item>

            <Button type='primary' htmlType='submit' className='submit-btn'>
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default InitialRegistrationForm;
