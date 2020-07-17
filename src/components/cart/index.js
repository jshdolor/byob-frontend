import CartItem from './item';
import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { toggleCartMenu } from '~/store/cartMenu/actions';
import { setCartItems } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GrFormClose } from 'react-icons/gr';
import ClientStorage from '~/lib/ClientStorage';

import CartService from '~/services/Cart';

const Cart = (props) => {
    const store = useStore();
    const { cart } = store.getState();

    const [currentCart, setCurrentCart] = useState(cart);

    // if has session
    useEffect(() => {
        // const fetchData = async () => {
        //     const savedCart = await CartService.getAll();
        //     props.setCartItems(savedCart);
        // };
        // fetchData();
        const storedCart = ClientStorage.get('cart');
        updateCurrentCart(storedCart);
    }, []);

    let totalPrice = 0;

    const updateCurrentCart = (cartValue) => {
        setCurrentCart(cartValue);
        totalPrice = currentCart.reduce((a, b) => a + b.price ?? 0, 0);
    };

    useEffect(() => {
        updateCurrentCart(cart);
    }, [cart.length]);

    if (process.browser) {
        window.addEventListener(
            'storage',
            () => {
                const storedCart = ClientStorage.get('cart');
                console.log('happen', storedCart);
                updateCurrentCart(storedCart);
            },
            false
        );
    }

    return (
        <Container className='bg-light pt-5'>
            <Row>
                <Col>
                    <div className='byob-title my-3 text-primary text-uppercase'>
                        Cart
                        <Button
                            variant='link'
                            className='float-right px-0'
                            onClick={() => {
                                props.toggleCartMenu();
                            }}
                        >
                            <GrFormClose size='2em'></GrFormClose>
                        </Button>
                    </div>
                    <div>
                        {currentCart.map((cartItem, i) => (
                            <CartItem item={cartItem} key={i}></CartItem>
                        ))}
                    </div>
                    <Button block className='mt-4' variant='primary'>
                        Checkout — P{totalPrice.toFixed(2)}
                    </Button>
                    <div className='my-2 byob-text-small text-center byob-text-secondary'>
                        Shipping & Taxes Calculated at Checkout
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = function (state) {
    return state.cartMenu;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            toggleCartMenu,
            setCartItems,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
