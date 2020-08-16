import React, { Component } from 'react';
import { Formik } from 'formik';
import EditProfileFormSchema from 'config/forms/schema/EditProfileFormSchema';
import { Form, Input } from 'formik-antd';
import { Button, Spin, Modal } from 'antd';
import { MOBILE_NUMBER_NO_ZERO, NUMBERS_ONLY } from 'config/forms/regex';
import UpdateProfileRequest from '~/services/Profile/requests/UpdateProfileRequest';
import ProfileService from '~/services/ProfileService';
class EditProfileForm extends Component {
    constructor(props) {
        super(props);

        const {
            firstName,
            lastName,
            email,
            mobileNumber,
            address1,
            address2,
        } = props.data;

        this.state = {
            visible: false,
            isFormSubmitting: false,
            apiMessage: false,
            initialForm: {
                firstName,
                lastName,
                email,
                mobileNumber,
                address1,
                address2,
            },
        };
    }

    componentDidMount() {}

    async handleFormSubmit(values, resetForm) {
        this.setState({ ...this.state, isFormSubmitting: true });
        const request = new UpdateProfileRequest(values);
        try {
            const data = await ProfileService.updateProfile(request);
            this.props.handle(data);

            this.setState({
                visible: true,
                apiMessage: false,
            });
        } catch (e) {
            if (e.getErrors) {
                const errors = e.getErrors();
                this.setState({
                    ...this.state,
                    visible: true,
                    apiMessage: { success: false, messages: errors },
                    isFormSubmitting: false,
                });
            }

            resetForm({ ...this.state.initialForm });
        }
        this.setState({ ...this.state, isFormSubmitting: false });
    }

    handleOk = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <>
                {this.state.apiMessage ? (
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        className='byob-popup'
                        closable={false}
                        footer={null}
                    >
                        <h1 className='title'>
                            {this.state.apiMessage.success
                                ? 'success'
                                : 'error'}
                        </h1>
                        {this.state.apiMessage.messages.map((msg, i) => (
                            <p key={i}>{msg}</p>
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
                    <Formik
                        initialValues={{ ...this.state.initialForm }}
                        validationSchema={EditProfileFormSchema}
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
                                <Form.Item name='email'>
                                    <Input
                                        name='email'
                                        placeholder='Email*'
                                        disabled
                                    />
                                </Form.Item>

                                <Form.Item name='firstName' className='name'>
                                    <Input
                                        name='firstName'
                                        placeholder='First Name*'
                                    />
                                </Form.Item>

                                <Form.Item
                                    name='lastName'
                                    className='name -last'
                                >
                                    <Input
                                        name='lastName'
                                        placeholder='Last Name*'
                                    />
                                </Form.Item>

                                <Form.Item
                                    name='mobileNumber'
                                    htmlFor='mobileNumber'
                                >
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

                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='submit-btn'
                                >
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
