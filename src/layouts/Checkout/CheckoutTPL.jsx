import React from 'react';
import { Row, Col } from 'antd';
import CheckoutContainer from './CheckoutContainer';
import CartContainer from './CartContainer';

const CheckoutTPL = () => {
    return (
        <Row className="checkout-page">
            <Col xs={24} sm={24} lg={12} className="">
                <CheckoutContainer />
            </Col>
            <Col xs={24} sm={24} lg={12} className="">
                <CartContainer />
            </Col>
        </Row>
    );
};

export default CheckoutTPL;
