import React from 'react';
import { Row, Col } from 'antd';
import CheckoutBreadCrumbs from './CheckoutBreadcrumbs';
import CheckoutForm from './CheckoutForm';

const CheckoutContainer = () => {
    return (
        <div className="checkout-page-container -checkout">
            <div className="checkout-content">
                <Row>
                    <Col>
                        <div className="logo"></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CheckoutBreadCrumbs />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <CheckoutForm />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CheckoutContainer;
