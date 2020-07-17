import { Nav, Navbar, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { toggleCartMenu } from '~/store/cartMenu/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState } from 'react';

const logo = 'https://pngimg.com/uploads/dna/dna_PNG52.png';

const Header = (props) => {
    const store = useStore();
    const { cart } = store.getState();

    const [cartCount, setCartCount] = useState(cart.length);

    if (process.browser) {
        window.addEventListener(
            'storage',
            () => {
                setCartCount(localStorage.getItem('count'));
            },
            false
        );
    }

    const userNav = true ? (
        <Link href='/login'>
            <a className='nav-link'>Login</a>
        </Link>
    ) : (
        <>
            <Link href='/account'>
                <a className='nav-link'>My Account</a>
            </Link>
            <Link href='/logout'>
                <a className='nav-link'>Logout</a>
            </Link>
        </>
    );

    const navBarProps = {
        collapseOnSelect: true,
        expand: 'lg',
        bg: 'primary',
        variant: 'dark',
        id: 'byob-navbar',
        sticky: 'top',
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
                    <Link href='/test'>
                        <a className='nav-link'>Test</a>
                    </Link>
                </Nav>
                <Nav>
                    {userNav}
                    <Nav.Link href='#features'>
                        <FaSearch></FaSearch>
                    </Nav.Link>
                    <Nav.Link href='#' onClick={() => props.toggleCartMenu()}>
                        <div style={{ position: 'relative' }}>
                            <FaShoppingCart></FaShoppingCart>
                            <Badge
                                style={{
                                    bottom: '-50%',
                                    left: '-50%',
                                }}
                                variant='accent'
                                className='text-light rounded-circle position-absolute'
                            >
                                {cart.length}
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
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
