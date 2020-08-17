import { Nav, Navbar, Badge } from 'react-bootstrap';
import Link from 'next/link';

import ByobLink from '~/components/widgets/ByobLink';
import { bottlePerMl } from '../config/app';

import { FaShoppingCart, FaSearch } from 'react-icons/fa';

import { toggleCartMenu } from '~/store/cartMenu/actions';
import { toggleHeader } from '~/store/app/actions';

import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';

import ClientStorage from '~/lib/ClientStorage';

import { userPages } from '~/config/routes';

const logo = '/images/logo.png';

const accountLink = (
    <ByobLink href='/account'>
        <a onClick={() => setNavbarExpanded(false)} className='nav-link'>
            My Account
        </a>
    </ByobLink>
);

const loginLink = (
    <ByobLink href='/login'>
        <a onClick={() => setNavbarExpanded(false)} className='nav-link'>
            Login
        </a>
    </ByobLink>
);

const Header = (props) => {
    const [cartCount, setCartCount] = useState(0);
    const { session } = useSelector((state) => state);

    const router = useRouter();
    const [userNav, setUserNav] = useState(loginLink);

    const getCurrentCart = () => {
        const cart = ClientStorage.get('cart');
        setCartCount(
            (cart || []).reduce((a, b) => {
                if (b.type.id === 1) {
                    return a + b.qty;
                }

                return a + Math.ceil(b.qty / bottlePerMl);
            }, 0)
        );
    };

    useEffect(() => {
        const socket = io();

        if (session.isLoggedIn) {
            setUserNav(accountLink);
            getCurrentCart();
        }

        socket.on('newCart', () => {
            getCurrentCart();
        });

        socket.on('userLoggedIn', () => {
            setUserNav(accountLink);
        });

        socket.on('userLoggedOut', () => {
            setUserNav(loginLink);

            if (userPages.indexOf(router.route)) {
                router.replace('/');
            }
        });

        return () => socket.disconnect();
    }, []);

    const navBarProps = {
        collapseOnSelect: true,
        expand: 'lg',
        bg: 'primary',
        variant: 'dark',
        id: 'byob-navbar',
        fixed: 'top',
    };

    const [navbarExpanded, setNavbarExpanded] = useState(false);

    return (
        <Navbar {...navBarProps} expanded={navbarExpanded}>
            <Navbar.Brand className='logo'>
                <Link href='/'>
                    <a>
                        <img
                            alt=''
                            src={logo}
                            className='d-inline-block align-top '
                        />{' '}
                    </a>
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle onClick={() => setNavbarExpanded(!navbarExpanded)} />

            <Navbar.Collapse className='nav -desktop'>
                <Nav className='mr-auto main-nav'>
                    <ByobLink href='/'>
                        <a
                            onClick={() => setNavbarExpanded(false)}
                            className='nav-link'
                        >
                            Home
                        </a>
                    </ByobLink>
                    <ByobLink href='/products'>
                        <a
                            onClick={() => setNavbarExpanded(false)}
                            className='nav-link'
                        >
                            Products
                        </a>
                    </ByobLink>
                    <ByobLink href='/blogs'>
                        <a
                            onClick={() => setNavbarExpanded(false)}
                            className='nav-link'
                        >
                            Blogs
                        </a>
                    </ByobLink>
                </Nav>
                <div className='login-nav'>
                    <Nav>{userNav}</Nav>
                </div>
            </Navbar.Collapse>
            <Nav className='cart-nav'>
                <Nav.Link
                    href='#'
                    onClick={() => {
                        setNavbarExpanded(false);

                        props.toggleCartMenu();
                    }}
                >
                    <div className='position-relative'>
                        <FaShoppingCart></FaShoppingCart>
                        {cartCount !== 0 ? (
                            <Badge
                                style={{
                                    bottom: '-50%',
                                    left: '-50%',
                                }}
                                variant='accent'
                                className='text-light rounded-circle position-absolute'
                            >
                                {cartCount}
                            </Badge>
                        ) : (
                            ''
                        )}
                    </div>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            toggleCartMenu,
            toggleHeader,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
