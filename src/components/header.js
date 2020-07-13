import { Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
const logo = 'https://pngimg.com/uploads/dna/dna_PNG52.png';

const userNav = true ? (
    <Nav>
        <Link href='/login'>
            <a className='nav-link'>Login</a>
        </Link>
    </Nav>
) : (
    <Nav>
        <Link href='/account'>
            <a className='nav-link'>My Account</a>
        </Link>
        <Nav.Link href='#features'>
            <FaSearch></FaSearch>
        </Nav.Link>
        <Nav.Link href='#pricing'>
            <FaShoppingCart></FaShoppingCart>
        </Nav.Link>
    </Nav>
);

const Header = () => (
    <Navbar
        collapseOnSelect
        sticky='top'
        expand='lg'
        bg='primary'
        variant='dark'
        id='byob-navbar'
    >
        <Navbar.Brand href='#home'>
            <img
                alt=''
                src={logo}
                height='30'
                className='d-inline-block align-top'
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav1' />
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
                <Link href='/'>
                    <a className='nav-link'>Home</a>
                </Link>
                <Link href='/products'>
                    <a className='nav-link'>Products</a>
                </Link>
                <Link href='/qr-scanner'>
                    <a className='nav-link'>Qr Scanner</a>
                </Link>
            </Nav>
            {userNav}
        </Navbar.Collapse>
    </Navbar>
);

export default Header;
