import Link from 'next/link';
import Head from 'next/head';
import LoginForm from '~/components/forms/Login';
import { Container, Row, Col } from 'react-bootstrap';

export default function OrderHistory() {
    return (
        <>
            <Head>
                <title>BYOB | Account - Order History</title>
            </Head>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col lg={4}>
                        <div className='byob-title text-uppercase text-primary my-3'>
                            Login
                        </div>
                        <LoginForm></LoginForm>
                        <hr />
                        <Row className='justify-content-md-center my-3'>
                            <div className='byob-text-small'>
                                Or login using
                            </div>
                        </Row>
                        <button className='btn btn-block btn-dark'>fb</button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
