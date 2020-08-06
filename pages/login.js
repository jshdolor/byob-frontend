import Link from 'next/link';
import Head from 'next/head';
import LoginForm from '~/components/forms/Login';
import { Container, Row, Col } from 'react-bootstrap';

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>BYOB | Login</title>
            </Head>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col lg={4}>
                        <div className='byob-title text-uppercase text-primary my-3'>
                            Login
                        </div>
                        <LoginForm></LoginForm>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
