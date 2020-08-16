import React, { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import CheckoutContainer from './CheckoutContainer';
import CartContainer from './CartContainer';
import { TOGGLE_CART_MENU } from '~/store/cartMenu/actions';
import { useSelector, useDispatch } from 'react-redux';

const CheckoutTPL = () => {
    const { isLoading } = useSelector((state) => state.checkout);
    const { open } = useSelector((state) => state.cartMenu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            dispatch({ type: TOGGLE_CART_MENU, payload: false });
        }
    }, []);

    return (
        <Spin spinning={isLoading}>
            <Row className="checkout-page">
                <Col xs={24} sm={24} lg={12}>
                    <CheckoutContainer />
                </Col>
                <Col xs={24} sm={24} lg={12}>
                    <CartContainer />
                </Col>
            </Row>
        </Spin>
    );
};

export default CheckoutTPL;
