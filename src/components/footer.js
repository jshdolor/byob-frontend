import {
    Image,
    InputGroup,
    FormControl,
    Container,
    Row,
    Button,
    Col,
} from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const logo = 'https://pngimg.com/uploads/dna/dna_PNG52.png';

const Footer = () => (
    <footer>
        <Container className='py-5'>
            <Row>
                <Col lg={4}>
                    <div className='byob-title text-white text-uppercase mb-3'>
                        Get Updates
                    </div>
                    <div className='byob-text-small my-3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                        <Col>Navigate</Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Image src={logo} fluid></Image>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className='btn-primary' variant='link'>
                        <FaFacebookF></FaFacebookF>
                    </Button>
                    <Button className='btn-primary' variant='link'>
                        <FaTwitter></FaTwitter>
                    </Button>
                    <Button className='btn-primary' variant='link'>
                        <FaInstagram></FaInstagram>
                    </Button>
                </Col>
                <Col className='text-right'>c 2020 All Rights Reserve</Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
