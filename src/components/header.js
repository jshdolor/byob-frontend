import { Nav, Navbar, Badge } from 'react-bootstrap';
import Link from 'next/link';
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

const logo = 'https://pngimg.com/uploads/dna/dna_PNG52.png';

const accountLink = (
    <Link href='/account'>
        <a className='nav-link'>My Account</a>
    </Link>
);

const loginLink = (
    <Link href='/login'>
        <a className='nav-link'>Login</a>
    </Link>
);

const Header = (props) => {
    const [cartCount, setCartCount] = useState(0);
    const { session } = useSelector((state) => state);

    const router = useRouter();
    const [userNav, setUserNav] = useState(loginLink);

    const getCurrentCart = () => {
        const cart = ClientStorage.get('cart');
        setCartCount((cart || []).reduce((a, b) => a + b.quantity, 0));
    };

    useEffect(() => {
        const socket = io();

        if (session.isLoggedIn) {
            setUserNav(accountLink);
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

        socket.on('test', (value) => {
            console.log(value);
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

    return (
        <Navbar {...navBarProps}>
            <Navbar.Brand>
                <Link href='/'>
                    <a>
                        <img
                            alt=''
                            src={logo}
                            height='30'
                            className='d-inline-block align-top'
                        />{' '}
                    </a>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className='mr-auto'>
                    <Link href='/'>
                        <a className='nav-link'>Home</a>
                    </Link>
                    <Link href='/products'>
                        <a className='nav-link'>Products</a>
                    </Link>
                    <Link href='/vlogs'>
                        <a className='nav-link'>Vlogs</a>
                    </Link>
                </Nav>
                <Nav>
                    {userNav}

                    <Nav.Link href='#features'>
                        <FaSearch></FaSearch>
                    </Nav.Link>
                    <Nav.Link href='#' onClick={() => props.toggleCartMenu()}>
                        <div className='position-relative'>
                            <FaShoppingCart></FaShoppingCart>
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
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
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
