import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import Router from 'next/router';
import { Spin, Modal, Button } from 'antd';
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
    setHasErrors,
} from '../../store/checkout/actions';
import { CHECKOUT_STEPS } from '../../config/checkout';
import CFCheckoutInformation from '../../components/forms/Checkout/CFCheckoutInformation';
import CFPaymentMethod from '../../components/forms/Checkout/CFPaymentMethod';
import CheckoutService from '../../services/Checkout/Checkout';
import CheckoutRequest from '../../services/Checkout/Requests/CheckoutRequest';

import { resetExpressCart } from '~/store/express-cart/actions';
import { handle as removeItem } from '~/components/cart/RemoveCartItemButton';
import { validURL } from '~/helpers';

const CheckoutForm = () => {
    const { formValues, currentStep, informationEditing } = useSelector(
        (state) => state.checkout
    );
    const cart = useSelector((state) => state.cart);
    const { discount } = useSelector((state) => state.checkout);

    const dispatch = useDispatch();
    const [apiMessage, setApiMessage] = useState({});

    const handlePayment = async (values) => {
        dispatch(startLoading());
        dispatch(setHasErrors(false));

        const code = discount.code ?? null;
        try {
            const request = { ...values, cart, code: discount.code };
            const localRequest = new CheckoutRequest(request);

            const isExpress = window.location.search.indexOf('express') > -1;

            const { data } = await CheckoutService.checkout(
                localRequest,
                isExpress,
                code
            );

            await cart.map(async (item) => await removeItem(item.product_id));

            if (isExpress) {
                dispatch(resetExpressCart());
            }

            if (validURL(data)) {
                window.location.href = data;
                return;
            }

            Router.replace('/404');
        } catch (e) {
            dispatch(stopLoading());
            dispatch(setHasErrors(true));

            if (e.getErrors) {
                setApiMessage({
                    visible: true,
                    messages: e.getErrors(),
                });
            }
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
        <>
            <Modal
                visible={apiMessage.visible}
                onOk={() => setApiMessage({})}
                className='byob-popup'
                closable={false}
                footer={null}
            >
                <h1 className='title'>Error</h1>
                {(apiMessage.messages || []).map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}

                <Button type='primary' onClick={() => setApiMessage({})}>
                    Okay
                </Button>
            </Modal>
            <Formik
                initialValues={formValues}
                validationSchema={checkoutFormSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <FormContainer setFieldValue={setFieldValue} />
                )}
            </Formik>
        </>
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
