import {
    Image,
    InputGroup,
    FormControl,
    Container,
    Row,
    Button,
    Col,
} from 'react-bootstrap';
import Link from 'next/link';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const logo = 'https://pngimg.com/uploads/dna/dna_PNG52.png';

const Footer = () => (
    <footer>
        <div className='footer'>
            <Container className='py-5'>
                <Row>
                    <Col lg={4}>
                        <div className='byob-title text-white text-uppercase mb-3'>
                            Get Updates
                        </div>
                        <div className='byob-text-small my-3'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </div>
                        <InputGroup className=' my-3'>
                            <FormControl placeholder='Email Address' />

                            <InputGroup.Append>
                                <Button variant='accent' className='text-white'>
                                    Sign up
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <Row>
                            <Col>
                                <span className='byob-title byob-text-small text-uppercase'>
                                    Navigate
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link href='/'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        Home
                                    </a>
                                </Link>
                                <Link href='/products'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        Products
                                    </a>
                                </Link>
                                <Link href='/faq'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        FAQs
                                    </a>
                                </Link>
                                <Link href='/how-to-order'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        How to Order
                                    </a>
                                </Link>
                            </Col>
                            <Col>
                                <Link href='/contact-us'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        Contact Us
                                    </a>
                                </Link>
                                <Link href='/social'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        Social
                                    </a>
                                </Link>
                                <Link href='/legal-disclaimer'>
                                    <a className='byob-text-small my-1 footer-link'>
                                        Legal Disclaimer
                                    </a>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Image src={logo} fluid></Image>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <span className='mr-3'>
                            <FaFacebookF size='1.2em'></FaFacebookF>
                        </span>
                        <span className='mr-3'>
                            <FaTwitter size='1.2em'></FaTwitter>
                        </span>
                        <span className='mr-3'>
                            <FaInstagram size='1.2em'></FaInstagram>
                        </span>
                    </Col>
                </Row>
            </Container>
            <Row className='bg-accent py-2'>
                <Col className='text-center byob-text-small '>
                    © 2020 All Rights Reserved
                </Col>
            </Row>
        </div>
    </footer>
);

export default Footer;
