import React, { Component } from 'react';
import { Formik } from 'formik';
import EditProfileFormSchema from 'config/forms/schema/EditProfileFormSchema';
import { Form, Input } from 'formik-antd';
import { Button, Spin, Modal } from 'antd';
import { MOBILE_NUMBER_NO_ZERO, NUMBERS_ONLY } from 'config/forms/regex';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isFormSubmitting: false,
      apiMessage: false,
      initialForm: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@domain.com',
        address1: '123',
        address2: '123',
        mobileNumber: '09175141703',
      },
    };
  }

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
        <p className='edit-title'>Edit Profile</p>
        <Spin spinning={this.state.isFormSubmitting}>
          <Formik initialValues={this.state.initialForm} validationSchema={EditProfileFormSchema} onSubmit={(values, { resetForm }) => this.handleFormSubmit(values, resetForm)}>
            {(props) => (
              <Form
                onChange={() =>
                  this.setState({
                    ...this.state,
                    apiMessage: false,
                  })
                }
              >
                <Form.Item name='email'>
                  <Input name='email' placeholder='Email*' disabled />
                </Form.Item>

                <Form.Item name='firstName' className='name'>
                  <Input name='firstName' placeholder='First Name*' />
                </Form.Item>

                <Form.Item name='lastName' className='name -last'>
                  <Input name='lastName' placeholder='Last Name*' />
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

                <Form.Item name='address1'>
                  <Input name='address1' placeholder='Address Line 1' />
                </Form.Item>

                <Form.Item name='address2'>
                  <Input name='address2' placeholder='Address Line 2' />
                </Form.Item>

                <Button type='primary' htmlType='submit' className='submit-btn'>
                  Confirm
                </Button>
              </Form>
            )}
          </Formik>
        </Spin>
      </>
    );
  }
}

export default EditProfileForm;
