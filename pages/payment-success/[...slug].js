import Head from 'next/head';
import SingleProductTPL from '../../src/layouts/Products/SingleProductTPL';
import ProductService from '~/services/Product';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'antd';
import Link from 'next/link';
export default function PaymentSuccessOrder(props) {
  return (
    <>
      <Head>
        <title>BYOB | Payment Success</title>
      </Head>
      <Container className='payment-success-page'>
        <Row justify='space-around' align='middle'>
          <Col span={18} className='content'>
            <h1 className='title'>THANK YOU</h1>
            <p className='description'>
              Your order is now being processed. You will receive an email confirmation with the details of your order. Don't forget to bring your eco bag in claiming your items!
            </p>
            <Link href='/' className={'btn'}>
              GO Back to Shopping
            </Link>
            <img className='splash-image' src='/images/color-splash.png' />
          </Col>
        </Row>
        <img className='bg-image' src='/images/bg-earth.png' />
      </Container>
    </>
  );
}
