import React, { Component } from 'react';
import { Formik } from 'formik';
import initialRegistrationFormSchema from 'config/forms/schema/initialRegistrationFormSchema';
import { Form, Input } from 'formik-antd';
import { Button, Spin } from 'antd';

import PreRegistrationRequest from '~/services/Registration/requests/PreRegistrationRequest';
import RegistrationService from '~/services/Registration/RegistrationService';

class InitialRegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormSubmitting: false,
            apiMessage: false,
            initialForm: {
                firstName: '',
                lastName: '',
                email: '',
                address1: '',
                address2: '',
            },
        };
    }

    componentDidMount() {}

    async handleFormSubmit(values, resetForm) {
        this.setState({ ...this.state, isFormSubmitting: true });

        const preRegRequest = new PreRegistrationRequest(values);
        try {
            const { message } = await RegistrationService.preRegistration(
                preRegRequest
            );
            resetForm(this.state.initialForm);
            this.setState({
                ...this.state,
                apiMessage: { success: true, messages: [message] },
            });
        } catch (e) {
            const errors = e.getErrors();
            this.setState({
                ...this.state,
                apiMessage: { success: false, messages: errors },
            });
        }
        this.setState({ ...this.state, isFormSubmitting: false });
    }

    render() {
        return (
            <Spin spinning={this.state.isFormSubmitting}>
                <Formik
                    initialValues={this.state.initialForm}
                    validationSchema={initialRegistrationFormSchema}
                    onSubmit={(values, { resetForm }) =>
                        this.handleFormSubmit(values, resetForm)
                    }
                >
                    {(props) => (
                        <Form
                            onChange={() =>
                                this.setState({
                                    ...this.state,
                                    apiMessage: false,
                                })
                            }
                        >
                            <Form.Item name='firstName' className='name'>
                                <Input
                                    name='firstName'
                                    placeholder='First Name*'
                                />
                            </Form.Item>

                            <Form.Item name='lastName' className='name -last'>
                                <Input
                                    name='lastName'
                                    placeholder='Last Name*'
                                />
                            </Form.Item>

                            <Form.Item name='email'>
                                <Input name='email' placeholder='Email*' />
                            </Form.Item>

                            <Form.Item name='address1'>
                                <Input
                                    name='address1'
                                    placeholder='Address Line 1'
                                />
                            </Form.Item>

                            <Form.Item name='address2'>
                                <Input
                                    name='address2'
                                    placeholder='Address Line 2'
                                />
                            </Form.Item>

                            {this.state.apiMessage ? (
                                <Form.Item
                                    validateStatus={
                                        this.state.apiMessage.success
                                            ? 'success'
                                            : 'error'
                                    }
                                    help={this.state.apiMessage.messages.map(
                                        (msg) => (
                                            <p>{msg}</p>
                                        )
                                    )}
                                ></Form.Item>
                            ) : (
                                ''
                            )}

                            <Button
                                type='primary'
                                htmlType='submit'
                                className='submit-btn'
                            >
                                Signup
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Spin>
        );
    }
}

export default InitialRegistrationForm;
