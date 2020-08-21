import React, { useState, useEffect } from 'react';

import { Form, Radio, Select, Input } from 'formik-antd';
import { Row, Col, Spin } from 'antd';
import Link from 'next/link';
import { get } from 'lodash';
import CFDividerHeader from './CFDivider';
import { CLAIMING_METHOD } from '../../../config/checkout';
import { useSelector, useDispatch } from 'react-redux';
import LockerService from '~/services/Lockers/LockerService';
import { availableLockers } from '~/config/app';

const { Option } = Select;

const tempLockerSchedule = [
    {
        date: 'August 14, 2020',
        status: 'available',
        time: [
            {
                id: 1, /// ID_DATE_TIME
                name: '8AM - 9PM',
                status: 'available',
            },
            {
                id: 2,
                name: '10AM - 11AM',
                status: 'disabled',
            },
        ],
    },
    {
        date: 'August 15, 2020',
        status: 'disabled',
        time: [
            {
                id: 3,
                name: '8AM - 9PM',
                status: 'disabled',
            },
            {
                id: 4,
                name: '10AM - 11AM',
                status: 'disabled',
            },
        ],
    },
    {
        date: 'August 16, 2020',
        status: 'avaialable',
        time: [
            {
                id: 5,
                name: '8AM - 9PM',
                status: 'avaialable',
            },
            {
                id: 6,
                name: '10AM - 11AM',
                status: 'avaialable',
            },
        ],
    },
];

const CFClaimingMethod = ({ setFieldValue }) => {
    const { formValues, currentStep, steps } = useSelector(
        (state) => state.checkout
    );

    const cart = useSelector((state) => state.cart);

    const [claimingMethod, setClaimingMethod] = useState(
        formValues.claimingMethod
    );

    const [lockerSchedules, setLockerSchedules] = useState([]);
    const [lockerSchedulesLoading, setLockerSchedulesLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const cartCount = await cart.reduce((a, item) => {
                const qty = item.type?.id === 2 ? item.bottles : item.qty;
                return a + qty;
            }, 0);
            const lockersNeeded = Math.ceil(cartCount / availableLockers);
            setLockerSchedulesLoading(true);
            const schedules = await LockerService.getSchedules(lockersNeeded);
            setLockerSchedules(schedules);
            setLockerSchedulesLoading(false);
        })();
    }, [cart]);

    const [date, setDate] = useState(formValues.lockerDate);
    const [time, setTime] = useState(formValues.lockerTime);
    const [prevDate, setPrevDate] = useState(formValues.lockerDate);

    useEffect(() => {
        if (prevDate != date) {
            setPrevDate(date);
            setTime('');
            setFieldValue('lockerTime', '');
        }
    }, [date, prevDate]);

    useEffect(() => {
        if (date) {
            const selectedDate = lockerSchedules.find(
                (locker) => locker.date === date
            );

            const lockerTimeText = (selectedDate?._time || []).find(
                (t) => t.schedule_id == time
            );

            setFieldValue('lockerTimeText', lockerTimeText?.name);
        }
    }, [time, date]);

    return (
        <>
            <CFDividerHeader title='Claiming Method' />
            <Form.Item style={{ display: 'none' }} name='lockerTimeText'>
                <Input name='lockerTimeText' />
            </Form.Item>
            <Form.Item name='claimingMethod'>
                <Radio.Group
                    onChange={(e) => {
                        setClaimingMethod(e.target.value);
                    }}
                    name='claimingMethod'
                    className='checkout-input claiming-method-input'
                    placeholder='Mobile Number'
                >
                    <Radio className='cm-item' value={CLAIMING_METHOD.LOCKER}>
                        Locker (maximum of 10 items per locker)
                    </Radio>
                    <Radio className='cm-item' value={CLAIMING_METHOD.BYOB}>
                        Bring Your Own Bote Booth
                        <br />
                        (At The Mind Museum BGC Taguig)
                        <br />
                        *For pick-up only
                    </Radio>
                </Radio.Group>
            </Form.Item>
            {claimingMethod == CLAIMING_METHOD.LOCKER && (
                <Spin spinning={lockerSchedulesLoading}>
                    <Row gutter={14}>
                        <Col xs={24} sm={24} md={12} span={12}>
                            <Form.Item name='lockerDate'>
                                <Select
                                    onChange={(v) => setDate(v)}
                                    style={{ width: '100%' }}
                                    name='lockerDate'
                                    className='checkout-input'
                                    placeholder='Select Date'
                                >
                                    {lockerSchedules.map((o) => (
                                        <Option
                                            // disabled={o.status === 'disabled'}
                                            value={o.date}
                                            key={o.date}
                                        >
                                            {o.date}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} span={12}>
                            <Form.Item name='lockerTime'>
                                <Select
                                    onChange={(v) => {
                                        setTime(v);
                                    }}
                                    style={{ width: '100%' }}
                                    name='lockerTime'
                                    className='checkout-input'
                                    placeholder='Select Time'
                                >
                                    {(
                                        lockerSchedules.find(
                                            (locker) => locker.date == date
                                        )?._time || []
                                    ).map((o) => (
                                        <Option
                                            key={o.schedule_id}
                                            disabled={
                                                o.locker_availability !==
                                                'enabled'
                                            }
                                            value={o.schedule_id}
                                        >
                                            {o.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Spin>
            )}
            <p className='-normal-text -italic'>
                Your items are only for pick-up. You will receive an SMS
                notification an hour before time of pick up. The BYOB Booth is
                open Monday to Sunday, from 8:00AM to 5:00PM. Please check our{' '}
                <Link href='faqs'>
                    <a>FAQ</a>
                </Link>{' '}
                for details.
            </p>
        </>
    );
};

export default CFClaimingMethod;
