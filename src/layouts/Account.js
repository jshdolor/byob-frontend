import Router, { useRouter } from 'next/router';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ClientStorage from '~/lib/ClientStorage';
import CookieManager from '~/lib/CookieManager';
import { logoutUser } from '~/store/session/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const accountLinks = [
    {
        path: '/account',
        label: 'My Account',
        cls: 'font-weight-bold',
    },
    {
        path: '/account/order-history',
        label: 'Order History',
        cls: 'font-weight-bold',
    },
];

const AccountLayout = ({ children, logoutUser }) => {
    const router = useRouter();

    const logout = () => {
        ClientStorage.set('cart', []);
        CookieManager.set('b-at', null);
        logoutUser(true);
        // Router.replace('/');
    };

    return (
        <Container>
            <Row>
                <Col lg={4} className='account-link-cont'>
                    {accountLinks.map((link, i) => (
                        <Form.Check
                            label={link.label}
                            type='radio'
                            onChange={() => {
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
                            className='text-primary signout-btn'
                        >
                            Sign Out
                        </Button>
                    </div>
                </Col>
                <Col lg={8} className='account-cont'>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            logoutUser,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountLayout);
