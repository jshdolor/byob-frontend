import { Image, Container, Row, Button, Col } from 'react-bootstrap';
import Link from 'next/link';

import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

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
                <Link href='/' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>Home</a>
                </Link>
                <Link href='/products' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>Shop</a>
                </Link>
                <Link href='/faqs' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>FAQs</a>
                </Link>
                <Link href='/how-to-order' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>How to Order</a>
                </Link>
              </Col>
              <Col>
                <Link href='/about-us' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>About Us</a>
                </Link>
                <Link href='/blogs' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>Blogs</a>
                </Link>
                <Link href='/legal-disclaimer' scroll={true}>
                  <a className='byob-text-small my-1 footer-link'>Legal Disclaimer</a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt-4 footer-social'>
          <Col>
            <span className='mr-3'>
              <a href='https://www.facebook.com/NutriAsia.Inc/' target='_blank'>
                <FaFacebookF size='1.2em'></FaFacebookF>
              </a>
            </span>
            <span className='mr-3'>
              <a href='https://youtube.com/nutriasiachannel' target='_blank'>
                <FaYoutube size='1.2em'></FaYoutube>
              </a>
            </span>
            <span className='mr-3'>
              <a href='https://www.linkedin.com/company/nutriasia' target='_blank'>
                <FaLinkedin size='1.2em'></FaLinkedin>
              </a>
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
