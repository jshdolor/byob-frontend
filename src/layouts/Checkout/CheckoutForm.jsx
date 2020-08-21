import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import Router from 'next/router';
import { Spin } from 'antd';
import checkoutFormSchema from '../../../config/forms/schema/checkoutFormSchema';
import CFContactInformation from '../../components/forms/Checkout/CFContactInformation';
import CFClaimingMethod from '../../components/forms/Checkout/CFClaimingMethod';
import { useSelector, useDispatch } from 'react-redux';
import {
    nextStep,
    setFormValues,
    prevStep,
    editForm,
    startLoading,
    stopLoading,
} from '../../store/checkout/actions';
import { CHECKOUT_STEPS } from '../../config/checkout';
import CFCheckoutInformation from '../../components/forms/Checkout/CFCheckoutInformation';
import CFPaymentMethod from '../../components/forms/Checkout/CFPaymentMethod';
import CheckoutService from '../../services/Checkout/Checkout';
import CheckoutRequest from '../../services/Checkout/Requests/CheckoutRequest';

import { resetCart } from '~/store/cart/actions';

const CheckoutForm = () => {
    const { formValues, currentStep, informationEditing } = useSelector(
        (state) => state.checkout
    );
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const handlePayment = async (values) => {
        dispatch(startLoading());
        try {
            const request = { ...values, cart };
            const localRequest = new CheckoutRequest(request);

            const response = await CheckoutService.checkout(localRequest);
            dispatch(resetCart([]));
            console.log(response);
            // window.location.href = response.data;
        } catch (e) {
            console.log(e);
            dispatch(stopLoading());
        }
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

    return (
        <Formik
            initialValues={formValues}
            validationSchema={checkoutFormSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue }) => (
                <FormContainer setFieldValue={setFieldValue} />
            )}
        </Formik>
    );
};

const FormContainer = (props) => {
    const { setFieldValue } = props;
    const { isLoggedIn, user } = useSelector((state) => state.session);
    const { currentStep, steps = [], informationEditing } = useSelector(
        (state) => state.checkout
    );

    const step = steps.find((s) => s.id === currentStep);

    useEffect(() => {
        if (isLoggedIn) {
            setFieldValue('email', user.email);
            setFieldValue('firstname', user.firstName);
            setFieldValue('lastname', user.lastName);
            setFieldValue('mobile_number', user.mobileNumber);
        }
    }, [isLoggedIn, user]);

    return (
        <Spin spinning={false}>
            <Form className='checkout-form'>
                {step.title === CHECKOUT_STEPS.CART && <CFContactInformation />}
                {step.title === CHECKOUT_STEPS.CART && (
                    <CFClaimingMethod setFieldValue={setFieldValue} />
                )}
                {step.title === CHECKOUT_STEPS.INFORMATION &&
                    informationEditing && <CFContactInformation />}
                {step.title === CHECKOUT_STEPS.INFORMATION &&
                    !informationEditing && <CFCheckoutInformation />}
                {step.title === CHECKOUT_STEPS.INFORMATION && (
                    <CFPaymentMethod />
                )}
                <FormFooter />
            </Form>
        </Spin>
    );
};

const FormFooter = () => {
    const dispatch = useDispatch();
    const { currentStep, steps = [] } = useSelector((state) => state.checkout);
    const step = steps.find((s) => s.id === currentStep);
    const handlePrev = () => {
        dispatch(prevStep());
    };

    const goToPage = (path) => {
        Router.push(path);
    };

    return (
        <div className='form-footer'>
            <div className='footer-action'>
                {step.title === CHECKOUT_STEPS.CART && (
                    <a
                        className='-italic'
                        onClick={() => goToPage('/products?open=1')}
                    >
                        &lt; Return to Cart
                    </a>
                )}
                {currentStep > 0 && (
                    <a className='-italic' onClick={handlePrev} href='#'>
                        &lt; Return to information
                    </a>
                )}
            </div>
            <div className='footer-action'>
                {currentStep <= 0 && (
                    <button
                        type={'submit'}
                        className='btn py-3 px-4 btn-primary btn-block'
                    >
                        Continue
                    </button>
                )}
                {step.title === CHECKOUT_STEPS.INFORMATION && (
                    <button
                        type='submit'
                        className='btn py-3 px-4 btn-primary btn-block'
                    >
                        PAYMENT
                    </button>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
