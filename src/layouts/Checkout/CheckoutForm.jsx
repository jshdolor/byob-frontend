import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form, Input, Radio } from 'formik-antd';
import { Row, Col, Spin, Select } from 'antd';
import Link from 'next/link';
import checkoutFormSchema from '../../../config/forms/schema/checkoutFormSchema';
import { get } from 'lodash';
import CFContactInformation from '../../components/forms/Checkout/CFContactInformation';
import CFClaimingMethod from '../../components/forms/Checkout/CFClaimingMethod';
import { useSelector, useDispatch } from 'react-redux';
import {
    nextStep,
    setFormValues,
    prevStep,
    editForm,
} from '../../store/checkout/actions';
import { CHECKOUT_STEPS } from '../../config/checkout';
import CFCheckoutInformation from '../../components/forms/Checkout/CFCheckoutInformation';
import CFPaymentMethod from '../../components/forms/Checkout/CFPaymentMethod';

const CheckoutForm = () => {
    const {
        formValues,
        currentStep,
        steps = [],
        informationEditing,
    } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();

    const handlePayment = (values) => {
        console.log('PAYMENT', values);
    };

    const handleSubmit = (values) => {
        dispatch(setFormValues(values));

        if (informationEditing) {
            dispatch(editForm());
        } else {
            if (currentStep > 0) {
                handlePayment(values);
            } else {
                dispatch(nextStep());
            }
        }
    };

    const step = steps.find((s) => s.id === currentStep);
    return (
        <Formik
            initialValues={formValues}
            validationSchema={checkoutFormSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => {
                return (
                    <Spin spinning={false}>
                        <Form className="checkout-form">
                            {step.title === CHECKOUT_STEPS.CART && (
                                <CFContactInformation />
                            )}
                            {step.title === CHECKOUT_STEPS.CART && (
                                <CFClaimingMethod
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            {step.title === CHECKOUT_STEPS.INFORMATION &&
                                informationEditing && <CFContactInformation />}
                            {step.title === CHECKOUT_STEPS.INFORMATION &&
                                !informationEditing && (
                                    <CFCheckoutInformation />
                                )}
                            {step.title === CHECKOUT_STEPS.INFORMATION && (
                                <CFPaymentMethod />
                            )}

                            <FormFooter />
                        </Form>
                    </Spin>
                );
            }}
        </Formik>
    );
};

const FormFooter = () => {
    const dispatch = useDispatch();
    const { currentStep, steps = [] } = useSelector((state) => state.checkout);
    const step = steps.find((s) => s.id === currentStep);
    const handlePrev = () => {
        dispatch(prevStep());
    };
    return (
        <div className="form-footer">
            <div className="footer-action">
                {step.title === CHECKOUT_STEPS.CART && (
                    <Link className="-italic" href="cart">
                        &lt; Return to Cart
                    </Link>
                )}
                {currentStep > 0 && (
                    <a className="-italic" onClick={handlePrev} href="#">
                        &lt; Return to information
                    </a>
                )}
            </div>
            <div className="footer-action">
                {currentStep <= 0 && (
                    <button
                        type={'submit'}
                        className="btn py-3 px-4 btn-primary btn-block"
                    >
                        Continue
                    </button>
                )}
                {step.title === CHECKOUT_STEPS.INFORMATION && (
                    <button
                        type={'submit'}
                        className="btn py-3 px-4 btn-primary btn-block"
                    >
                        PAYMENT
                    </button>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
