import { Image, Container, Row, Button, Col } from 'react-bootstrap';
import Link from 'next/link';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const logo = 'images/footer-logo.png';

const AppFooter = () => (
  <footer>
    <div className='footer'>
      <Container className='py-4'>
        <Row>
          <Col lg={8} className='footer-info'>
            <Image src={logo} fluid className='footer-logo'></Image>
            <p>
              Founded in 1991, NutriAsia Group is a powerhouse of beloved, timeless, and iconic Filipino food brands that include Datu Puti, Silver Swan, Mang Tomas, UFC, Papa Catsup, Jufran; UFC
              Cooking Sauces and Meal Mixes; Golden Fiesta Cooking Oil; and Locally Blended Juice Drink and Merci Buco Coco water.
            </p>
          </Col>
          <Col lg={4} className='footer-nav'>
            <Row>
              <Col>
                <span className='byob-title byob-text-small text-uppercase'>Navigate</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href='/'>
                  <a className='byob-text-small my-1 footer-link'>Home</a>
                </Link>
                <Link href='/products'>
                  <a className='byob-text-small my-1 footer-link'>Products</a>
                </Link>
                <Link href='/faq'>
                  <a className='byob-text-small my-1 footer-link'>FAQs</a>
                </Link>
                <Link href='/how-to-order'>
                  <a className='byob-text-small my-1 footer-link'>How to Order</a>
                </Link>
              </Col>
              <Col>
                <Link href='/contact-us'>
                  <a className='byob-text-small my-1 footer-link'>Contact Us</a>
                </Link>
                <Link href='/blogs'>
                  <a className='byob-text-small my-1 footer-link'>Social</a>
                </Link>
                <Link href='/legal-disclaimer'>
                  <a className='byob-text-small my-1 footer-link'>Legal Disclaimer</a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt-4 footer-social'>
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
      <Container fluid>
        <Row className='bg-accent py-2'>
          <Col className='text-center byob-text-small '>© 2020 All Rights Reserved</Col>
        </Row>
      </Container>
    </div>
  </footer>
);

export default AppFooter;
