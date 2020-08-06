import Router, { useRouter } from 'next/router';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ClientStorage from '~/lib/ClientStorage';

const accountLinks = [
    {
        path: '/account/',
        label: 'My Account',
        cls: 'font-weight-bold',
    },
    {
        path: '/account/order-history',
        label: 'Order History',
        cls: 'font-weight-bold',
    },
];

const AccountLayout = ({ children }) => {
    const router = useRouter();

    const logout = () => {
        ClientStorage.set('cart', []);
        Router.replace('/');
    };

    return (
        <Container>
            <Row>
                <Col lg={2}></Col>
                <Col lg={10} className='byob-title text-primary text-uppercase'>
                    <div className='mb-3'>My Account</div>
                </Col>
            </Row>
            <Row>
                <Col lg={2}>
                    {accountLinks.map((link, i) => (
                        <Form.Check
                            label={link.label}
                            type='radio'
                            onClick={() => {
                                Router.push(link.path);
                            }}
                            checked={router.pathname == link.path}
                            name='link'
                            key={i}
                            className={'my-1 byob-text-small ' + link.cls}
                        ></Form.Check>
                    ))}
                    <div className='my-1 byob-text-small ml-3'>
                        <Button
                            onClick={logout}
                            variant='link'
                            className='text-primary'
                        >
                            Sign Out
                        </Button>
                    </div>
                </Col>
                <Col lg={10}>{children}</Col>
            </Row>
        </Container>
    );
};

export default AccountLayout;