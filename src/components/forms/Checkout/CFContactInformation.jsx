import React, { useEffect, useState } from 'react';

import { Form, Input } from 'formik-antd';
import { Row, Col, Spin } from 'antd';
import Link from 'next/link';
import CFDividerHeader from './CFDivider';
import { useSelector, useDispatch } from 'react-redux';
import { editForm } from '../../../store/checkout/actions';
import { setUser } from '~/store/session/actions';

import ProfileService from '~/services/ProfileService';

const CFContactInformation = () => {
    const { currentStep } = useSelector((state) => state.checkout);
    const { isLoggedIn } = useSelector((state) => state.session);
    const [isDisabled, setDisabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const dispatch = useDispatch();
    const handleBack = () => {
        dispatch(editForm());
    };
    useEffect(() => {
        setDisabled(isLoggedIn);
        if (isLoggedIn) {
            (async () => {
                setIsFetching(true);
                const user = await ProfileService.get();
                dispatch(setUser(user));
                setIsFetching(false);
            })();
        }
    }, [isLoggedIn]);
    return (
        <Spin spinning={isFetching}>
            <CFDividerHeader
                title='Contact Information'
                action={
                    !isLoggedIn ? (
                        <>
                            Already have an account?{' '}
                            <Link href='/login?redirect=checkout'>
                                <a>Login</a>
                            </Link>
                        </>
                    ) : (
                        ''
                    )
                }
            />
            <Form.Item name='email'>
                <Input
                    disabled={isDisabled}
                    name='email'
                    className='checkout-input'
                    placeholder='Email'
                />
            </Form.Item>
            <Row gutter={14}>
                <Col xs={24} sm={24} md={12} span={12}>
                    <Form.Item name='firstname'>
                        <Input
                            disabled={isDisabled}
                            name='firstname'
                            className='checkout-input'
                            placeholder='First Name'
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} span={12}>
                    <Form.Item name='lastname'>
                        <Input
                            disabled={isDisabled}
                            name='lastname'
                            className='checkout-input'
                            placeholder='Last Name'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name='mobile_number'>
                <Input
                    disabled={isDisabled}
                    name='mobile_number'
                    className='checkout-input'
                    placeholder='Mobile Number'
                />
            </Form.Item>
            {currentStep > 0 && (
                <div className='form-footer'>
                    <div className='footer-action'>
                        {currentStep > 0 && (
                            <a
                                className='-italic'
                                onClick={handleBack}
                                href='#'
                            >
                                &lt; Cancel
                            </a>
                        )}
                    </div>
                    <div className='footer-action'>
                        <button
                            type={'submit'}
                            className='btn py-3 px-4 btn-primary btn-block'
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </Spin>
    );
};

export default CFContactInformation;
