import Link from 'next/link';
import Head from 'next/head';
import LoginForm from '~/components/forms/Login';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileService from '~/services/ProfileService';
import hasAuth from '~/middleware/hasAuth';

function LoginPage() {
    return (
        <>
            <Head>
                <title>BYOB | Login</title>
            </Head>
            <Container className='login-container'>
                <Row className='justify-content-md-center'>
                    <Col lg={5}>
                        <div className='my-3'>
                            <div className='byob-title text-uppercase text-primary '>
                                Login
                            </div>
                            <small>
                                Don't have an account?{' '}
                                <i>
                                    <Link href='/signup'>
                                        <a>Signup</a>
                                    </Link>
                                </i>
                            </small>
                        </div>

                        <LoginForm></LoginForm>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

LoginPage.getInitialProps = async (ctx) => {
    await hasAuth(ctx);
    return {};
};

export default LoginPage;
