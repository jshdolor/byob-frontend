import React, { useState, useEffect } from 'react';

import { Form, Radio, Select, Input } from 'formik-antd';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { get } from 'lodash';
import CFDividerHeader from './CFDivider';
import { CLAIMING_METHOD } from '../../../config/checkout';
import { useSelector, useDispatch } from 'react-redux';
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
  const { formValues, currentStep, steps } = useSelector((state) => state.checkout);
  const [claimingMethod, setClaimingMethod] = useState(formValues.claimingMethod);

  const [date, setDate] = useState(formValues.lockerDate);
  const [time, setTime] = useState(formValues.lockerTime);
  const [prevDate, setPrevDate] = useState(formValues.lockerDate);

  const getTimeList = (_date) => {
    return get(
      tempLockerSchedule.find((t) => t.date === _date),
      'time',
      []
    );
  };
  useEffect(() => {
    if (prevDate != date) {
      setPrevDate(date);
      setTime('');
      setFieldValue('lockerTime', '');
    }
  }, [date, prevDate]);

  useEffect(() => {
    if (date) {
      const list = getTimeList(date);
      const lockerTimeText = get(
        list.find((t) => t.id == time),
        'name',
        ''
      );
      setFieldValue('lockerTimeText', lockerTimeText);
    }
  }, [time, date]);
  const timeList = getTimeList(date);
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
          <Radio className='cm-item' disabled value={CLAIMING_METHOD.LOCKER}>
            Locker (maximum of 10 items per locker) *coming soon
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
        <Row gutter={14}>
          <Col xs={24} sm={24} md={12} span={12}>
            <Form.Item name='lockerDate'>
              <Select onChange={(v) => setDate(v)} style={{ width: '100%' }} name='lockerDate' className='checkout-input' placeholder='Select Date'>
                {tempLockerSchedule.map((o) => (
                  <Option disabled={o.status === 'disabled'} value={o.date}>
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
                {timeList.map((o) => (
                  <Option disabled={o.status === 'disabled'} value={o.id}>
                    {o.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}
      <p className='-normal-text -italic'>
        Your items are only for pick-up. You will receive an SMS notification an hour before time of pick up. The BYOB Booth is open Monday to Sunday, from 8:00AM to 5:00PM. Please check our
        <Link href='faqs'>
          <a>FAQ</a>
        </Link>{' '}
        for details.
      </p>
    </>
  );
};

export default CFClaimingMethod;
