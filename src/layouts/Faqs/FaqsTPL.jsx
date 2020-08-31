import { Container } from 'react-bootstrap';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import FAQService from '~/services/FaqService';
const { Panel } = Collapse;
import ContactUsTPL from '../ContactUs/ContactUsTPL';

import { useEffect, useState } from 'react';

const FaqsTPL = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        (async () => {
            const faqs = await FAQService.getAll();
            setFaqs(faqs);
        })();
    }, []);

    return (
        <div className='faqs-container'>
            <Container>
                <h4 className='faqs-title'>Frequently Asked Questions</h4>
                <div className='accordion-cont'>
                    <Collapse
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                    >
                        {faqs.map((faq) => {
                            return (
                                <Panel header={faq.question} key={faq.id}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: faq.answer,
                                        }}
                                    ></div>
                                </Panel>
                            );
                        })}
                    </Collapse>
                </div>
                <div className='mt-5'>
                    <ContactUsTPL></ContactUsTPL>
                </div>
            </Container>
        </div>
    );
};

export default FaqsTPL;
