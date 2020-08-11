import React, { Component } from 'react';
import { Formik } from 'formik';
import finalRegistrationFormSchema from 'config/forms/schema/finalRegistrationFormSchema';
import { Form, Input } from 'formik-antd';
import { MOBILE_NUMBER_NO_ZERO, NUMBERS_ONLY } from 'config/forms/regex';
import { Button, Spin, Modal } from 'antd';
import FinalRegistrationRequest from '~/services/Registration/requests/FinalRegistrationRequest';
import RegistrationService from '~/services/Registration/RegistrationService';
import Router from 'next/router';

class FinalRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormSubmitting: false,
      apiMessage: false,
      visible: false,
      initialForm: {
        mobileNumber: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  }

  async handleFormSubmit(values, resetForm) {
    this.setState({ ...this.state, isFormSubmitting: true });

    const request = new FinalRegistrationRequest(values);
    try {
      const { message } = await RegistrationService.finalRegistration(request, this.props.token);
      resetForm(this.state.initialForm);
      this.setState({
        ...this.state,
        visible: true,
        apiMessage: { success: true, messages: [message] },
      });
      Router.replace('/login');
    } catch (e) {
      const errors = e.getErrors();
      this.setState({
        ...this.state,
        visible: true,
        apiMessage: { success: false, messages: errors },
      });
    }
    this.setState({ ...this.state, isFormSubmitting: false });
  }

  handleOk = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {}

  render() {
    return (
      <>
        {this.state.apiMessage ? (
          <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} className='byob-popup' closable={false} footer={null}>
            <h1 className='title'>{this.state.apiMessage.success ? 'success' : 'error'}</h1>
            {this.state.apiMessage.messages.map((msg) => (
              <p>{msg}</p>
            ))}

            <Button type='primary' onClick={this.handleOk}>
              Okay
            </Button>
          </Modal>
        ) : (
          ''
        )}
        <Spin spinning={this.state.isFormSubmitting}>
          <Formik initialValues={this.state.initialForm} validationSchema={finalRegistrationFormSchema} onSubmit={(values, { resetForm }) => this.handleFormSubmit(values, resetForm)}>
            {(props) => (
              <Form>
                <Form.Item name='password' htmlFor='password'>
                  <Input name='password' id='password' type='password' placeholder='Password*' />
                  {!props.touched.password && <span className='input-hint'>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                </Form.Item>
                <Form.Item name='passwordConfirmation' htmlFor='passwordConfirmation'>
                  <Input name='passwordConfirmation' id='passwordConfirmation' type='password' placeholder='Re-enter Password*' />
                </Form.Item>

                <Form.Item name='mobileNumber' htmlFor='mobileNumber'>
                  <div className='mobile-number-input-row'>
                    <Input
                      id='mobileNumber'
                      placeholder='Mobile Number*'
                      maxLength={11}
                      value={props.values.mobileNumber}
                      name='mobileNumber'
                      onKeyPress={(e) => {
                        if (!NUMBERS_ONLY.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </Form.Item>

                <Button type='primary' htmlType='submit' className='submit-btn'>
                  CONFIRM
                </Button>
              </Form>
            )}
          </Formik>
        </Spin>
      </>
    );
  }
}

export default FinalRegistrationForm;
