import React, { useState, useEffect } from 'react';

import { Form, Radio } from 'formik-antd';
import { Row, Col, Select } from 'antd';
import Link from 'next/link';
import { get } from 'lodash';
import CFDividerHeader from './CFDivider';
const { Option } = Select;

const CFPaymentMethod = () => {
    return (
        <div style={{ marginTop: 70 }}>
            <CFDividerHeader title="Payment Method" />

            <Form.Item name="paymentMethod">
                <Radio.Group
                    style={{ width: '100%' }}
                    name="paymentMethod"
                    className="checkout-input claiming-method-input"
                    placeholder="Mobile Number"
                >
                    <Radio className="cm-item" value={'paypal'}>
                        <span>Credit/Debit Card via Paypal</span>
                        <img src={'/images/Paypal-Logo.png'} />
                    </Radio>
                    <Radio className="cm-item" value={'gcash'}>
                        <span>GCash</span>
                        <img src={'/images/Gcash-Logo.png'} />
                    </Radio>
                    <Radio className="cm-item" value={'paymaya'}>
                        <span>Paymaya</span>
                        <img src={'/images/Paymaya-Logo.png'} />
                    </Radio>
                </Radio.Group>
            </Form.Item>
        </div>
    );
};

export default CFPaymentMethod;
