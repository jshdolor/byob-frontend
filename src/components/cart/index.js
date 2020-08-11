import CartItem from './item';
import React, { useEffect, useState, useMemo } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { toggleCartMenu } from '~/store/cartMenu/actions';
import { setCartItems } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GrFormClose } from 'react-icons/gr';
import ClientStorage from '~/lib/ClientStorage';
import io from 'socket.io-client';

import CartItemModel from '~/models/cart';

import ProductService from '~/services/Product';

const Cart = (props) => {
    const store = useStore();
    const { cart } = store.getState();

    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        updateCurrentCart(cart);

        const socket = io();

        socket.on('newCart', async () => {
            const storedCart = ClientStorage.get('cart');

            if (storedCart.length === 0) {
                updateCurrentCart([]);

                return;
            }

            const modeledCart = await storedCart.map(async (item) => {
                const product = await ProductService.getById(item.product_id);
                return storedCart.map((item) => {
                    const cartItem = new CartItemModel(item, product);
                    return cartItem;
                });
            });

            updateCurrentCart(modeledCart);
        });

        return () => socket.disconnect();
    }, []);

    const updateCurrentCart = (cartValue) => {
        setCartItems(cartValue);
    };

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
                        {(cartItems || []).map((cartItem, i) => (
                            <CartItem item={cartItem} key={i}></CartItem>
                        ))}
                    </div>
                    <Button block className='mt-4' variant='primary'>
                        Checkout —{' '}
                        <span className='ml-2'>
                            P
                            {(cartItems || [])
                                .reduce(
                                    (a, b) => a + parseFloat(b.total) ?? 0,
                                    0
                                )
                                .toFixed(2)}
                        </span>
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
