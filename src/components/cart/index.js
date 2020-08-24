import CartItem from './item';
import React, { useEffect, useState, useMemo } from 'react';
import Router from 'next/router';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { toggleCartMenu } from '~/store/cartMenu/actions';

import { setCartItems, setCart } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GrFormClose } from 'react-icons/gr';
import ClientStorage from '~/lib/ClientStorage';
import io from 'socket.io-client';

import CartItemModel from '~/models/cart';

import ProductService from '~/services/Product';

import { Typography, Tooltip, Space } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
const { Text } = Typography;
import { amountPrecision, bottlePrice } from '~/config/app';

const Cart = (props) => {
    const store = useStore();
    const { cart } = store.getState();

    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        updateCurrentCart(cart || []);

        const socket = io();

        socket.on('newCart', async () => {
            const storedCart = ClientStorage.get('cart') || [];

            if (storedCart.length === 0) {
                updateCurrentCart([]);
                return;
            }

            let productsOnCart = storedCart.map(async (item) => {
                const product = await ProductService.getById(item.product_id);
                return new CartItemModel(item, product);
            });

            const modeledCart = await Promise.all(productsOnCart);
            updateCurrentCart(modeledCart);
        });

        return () => socket.disconnect();
    }, []);

    const updateCurrentCart = (cartValue) => {
        setCartItems(cartValue);
        props.setCart(cartValue);
    };

    return (
        <Container className='bg-light pt-5'>
            <Row>
                <Col>
                    <div className='byob-title my-3 text-primary text-uppercase'>
                        Cart
                        <Button
                            variant='link'
                            style={{ position: 'absolute', right: 5, top: 5 }}
                            className='px-0'
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

                    <Row className='subtotal-cont '>
                        <Col>Subtotal</Col>
                        <Col className='text-right'>
                            P
                            {(cartItems || [])
                                .reduce(
                                    (a, b) => a + parseFloat(b.total) ?? 0,
                                    0
                                )
                                .toFixed(amountPrecision)}
                        </Col>
                    </Row>
                    <Row className='align-items-center'>
                        <Col>
                            <Tooltip
                                placement='top'
                                title={`Return the used bottle at BYOB booth to receive
                                a refund code that you can use in your next
                                purchase`}
                                color={'#0da9d9'}
                            >
                                <InfoCircleFilled
                                    style={{
                                        color: '#0da9d9',
                                        fontSize: '16px',
                                    }}
                                />
                            </Tooltip>{' '}
                            Bottle (x
                            {cartItems
                                .filter((item) => item.type.id === 2)
                                .reduce((a, b) => a + b.bottles, 0)}
                            )
                        </Col>
                        <Col className='text-right'>
                            P
                            {cartItems
                                .filter((item) => item.type.id === 2)
                                .reduce(
                                    (a, b) => a + b.bottles * bottlePrice,
                                    0
                                )
                                .toFixed(amountPrecision)}
                        </Col>
                    </Row>

                    <Button
                        onClick={() => Router.push('/checkout')}
                        block
                        className='mt-4'
                        variant='primary'
                        disabled={cartItems.length === 0}
                    >
                        Checkout —{' '}
                        <span className='ml-2'>
                            P
                            {(cartItems || [])
                                .reduce(
                                    (a, b) => {
                                        const bottles =
                                            b.type.id === 2
                                                ? b.bottles * bottlePrice
                                                : 0;
                                        return (
                                            a + parseFloat(b.total) + bottles
                                        );
                                    },

                                    0
                                )
                                .toFixed(amountPrecision)}
                        </span>
                    </Button>
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
            setCart,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
