import React from 'react';
import { Row, Col, Spin } from 'antd';
import CheckoutContainer from './CheckoutContainer';
import CartContainer from './CartContainer';
import { useSelector } from 'react-redux';

const CheckoutTPL = () => {
    const { isLoading } = useSelector((state) => state.checkout);
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
