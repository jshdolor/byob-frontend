import Link from 'next/link';
import Head from 'next/head';
import LoginForm from '~/components/forms/Login';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileService from '~/services/ProfileService';

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>BYOB | Login</title>
            </Head>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col lg={4}>
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

export const getServerSideProps = async (ctx) => {
    try {
        await ProfileService.get(ctx);
        //meaning already loggedin
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', `/`);
    } catch (e) {}

    return { props: {} };
};
