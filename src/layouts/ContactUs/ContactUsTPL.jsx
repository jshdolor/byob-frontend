import React, { Component, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ContactForm from 'components/forms/ContactForm/ContactForm';
import { Row, Col } from 'antd';

import service from '~/services/Contact/ContactUsService';

const ContactUsTPL = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            const data = await service.get();
            setData(data);
        })();
    }, []);

    return (
        <div className='contact-container'>
            <div className='form-container'>
                <ContactForm></ContactForm>
            </div>

            <div className='contact-info'>
                <p>We will get back to you as soon as possible</p>
                <Row align='bottom'>
                    <Col span={14}>
                        <div className='info-cont'>
                            <h5 className='info-title'>General Inquiry</h5>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: data.phone_number,
                                }}
                            ></p>
                        </div>
                        <div className='info-cont'>
                            <h5 className='info-title'>Press and Media</h5>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: data.email,
                                }}
                            ></p>
                        </div>
                        <div className='info-cont'>
                            <h5 className='info-title'>Office Address</h5>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: data.address,
                                }}
                            ></p>
                        </div>
                    </Col>
                    <Col span={10} className='contact-image-cont'>
                        <img
                            className='contact-logo'
                            src='/images/contact.png'
                            alt='logo'
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ContactUsTPL;
