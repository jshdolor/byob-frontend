import React, { Component } from 'react';
import { Formik } from 'formik';
import finalRegistrationFormSchema from 'config/forms/schema/finalRegistrationFormSchema';
import { Form, Input } from 'formik-antd';
import { Button } from 'antd';

class UpdatePasswordForm extends Component {
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
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={finalRegistrationFormSchema}
        onSubmit={this.handleFormSubmit}
      >
        {(props) => (
          <Form>
            <Form.Item name='password' htmlFor='password'>
              <Input name='password' id='password' type='password' placeholder='Password*' />
              {!props.touched.password && <span className='input-hint'>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}
            </Form.Item>
            <Form.Item name='passwordConfirmation' htmlFor='passwordConfirmation'>
              <Input name='passwordConfirmation' id='passwordConfirmation' type='password' placeholder='Re-enter Password*' />
            </Form.Item>

            <Button type='primary' htmlType='submit' className='submit-btn'>
              CONFIRM
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default UpdatePasswordForm;
