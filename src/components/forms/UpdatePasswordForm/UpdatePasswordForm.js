import { useState } from 'react';
import { Formik } from 'formik';
import updatePassword from 'config/forms/schema/updatePassword';
import { Form, Input } from 'formik-antd';
import { Button, Spin } from 'antd';
import ProfileService from '~/services/ProfileService';
import { useRouter } from 'next/router';
const UpdatePasswordForm = () => {
    const initialValues = {
        password: '',
        passwordConfirmation: '',
    };

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleFormSubmit = async (values, resetForm) => {
        console.log(values);

        setSubmitting(true);
        try {
            await ProfileService.updatePassword({
                password: values.password,
                password_confirmation: values.passwordConfirmation,
            });
            router.push('/account');
        } catch (e) {
            console.log(e);
        }
        setSubmitting(true);
    };

    return (
        <Spin spinning={submitting}>
            <Formik
                initialValues={initialValues}
                validationSchema={updatePassword}
                onSubmit={(values, { resetForm }) =>
                    handleFormSubmit(values, resetForm)
                }
            >
                {(props) => (
                    <Form>
                        <Form.Item name='password' htmlFor='password'>
                            <Input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Password*'
                            />
                            {!props.touched.password && (
                                <span className='input-hint'>
                                    Minimum eight characters, at least one
                                    uppercase letter, one lowercase letter, one
                                    number and one special character
                                </span>
                            )}
                        </Form.Item>
                        <Form.Item
                            name='passwordConfirmation'
                            htmlFor='passwordConfirmation'
                        >
                            <Input
                                name='passwordConfirmation'
                                id='passwordConfirmation'
                                type='password'
                                placeholder='Re-enter Password*'
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
    );
};

export default UpdatePasswordForm;
