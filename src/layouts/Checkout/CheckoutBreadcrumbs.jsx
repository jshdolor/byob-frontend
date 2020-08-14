import React from 'react';
import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
const CheckoutBreadCrumbs = () => {
    const { currentStep } = useSelector((state) => state.checkout);

    return (
        <Breadcrumb separator={'>'}>
            <Breadcrumb.Item className="b-item -active">Cart</Breadcrumb.Item>
            <Breadcrumb.Item
                className={`b-item ${currentStep > 0 ? '-active' : ''}`}
            >
                Information
            </Breadcrumb.Item>
            <Breadcrumb.Item
                className={`b-item ${currentStep > 1 ? '-active' : ''}`}
            >
                Payment
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default CheckoutBreadCrumbs;
