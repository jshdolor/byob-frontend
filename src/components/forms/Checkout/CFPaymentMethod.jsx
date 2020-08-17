import React from 'react';
import { Form, Radio } from 'formik-antd';
import CFDividerHeader from './CFDivider';

const PAYMENT_METHODS = [
    {
        value: 'paypal',
        title: 'Credit/Debit Card via Paypal',
        image: '/images/Paypal-Logo.png',
    },
    {
        value: 'gcash',
        title: 'GCash',
        image: '/images/Gcash-Logo.png',
    },
    {
        value: 'paymaya',
        title: 'Paymaya',
        image: '/images/Paymaya-Logo.png',
    },
];

const CFPaymentMethod = () => {
    return (
        <div style={{ marginTop: 70 }}>
            <CFDividerHeader title='Payment Method' />

            <Form.Item name='payment_gateway'>
                <Radio.Group
                    style={{ width: '100%' }}
                    name='payment_gateway'
                    className='checkout-input claiming-method-input'
                    placeholder='Mobile Number'
                >
                    {PAYMENT_METHODS.map((pm, i) => (
                        <Radio
                            disabled={pm.disabled}
                            className='cm-item'
                            value={pm.value}
                            key={i}
                        >
                            <span>{pm.title}</span>
                            <img src={pm.image} />
                        </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
        </div>
    );
};

export default CFPaymentMethod;
