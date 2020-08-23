import React, { PureComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CartItem from '../../components/cart/item';
import {
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import Link from 'next/link';
import {
    amountPrecision,
    bottlePrice,
    bottlePerMl,
    itemsPerLocker,
} from '~/config/app';
import { Divider } from 'antd';

const CartContainer = () => {
    const router = useRouter();

    const cartItems =
        useSelector((state) => {
            if (router.query?.express == 1) {
                if (state.expressCart.length === 0) {
                    router.replace('/products');
                }
                return state.expressCart;
            }
            return state.cart;
        }) || [];
    const { isLoggedIn } = useSelector((state) => state.session);
    const { currentStep, pickupType } = useSelector((state) => state.checkout);
    const cartCount = (cartItems || []).reduce((a, b) => {
        if (b.type.id === 1) {
            return a + b.qty;
        }
        return a + Math.ceil(b.qty / bottlePerMl);
    }, 0);

    const lockersNeeded = Math.ceil(cartCount / itemsPerLocker);

    const isDisabled = currentStep > 0;
    const subtotal = (cartItems || [])
        .reduce((a, b) => a + parseFloat(b.total) ?? 0, 0)
        .toFixed(amountPrecision);
    const bottle = cartItems
        .filter((item) => item.type.id === 2)
        .reduce((a, b) => a + b.bottles * bottlePrice, 0)
        .toFixed(amountPrecision);
    const total = (parseFloat(subtotal) || 0) + (parseFloat(bottle) || 0);

    return (
        <div id='checkout-cart' className='checkout-page-container -cart'>
            <div className='cart-content'>
                <div>
                    {cartItems.map((cartItem, i) => (
                        <CartItem
                            disabled={isDisabled}
                            checkout
                            item={cartItem}
                            key={i}
                        ></CartItem>
                    ))}
                </div>
                <Row className='mt-4 '>
                    <Col className={'byod -regular-font'}>
                        Total Number of Items: <em>{cartCount}</em>
                    </Col>
                </Row>

                {pickupType === 'locker' && (
                    <Row>
                        <Col className={'byod -regular-font'}>
                            Lockers to be used: <em>{lockersNeeded}</em>
                        </Col>
                    </Row>
                )}

                {!isDisabled && (
                    <Row>
                        <Col>
                            <VoucherInput disabled={!isLoggedIn} />
                            {!isLoggedIn ? (
                                <small>
                                    Login to use a promo code. Don't have an
                                    account yet?{' '}
                                    <Link href='/signup'>
                                        <a>Sign up</a>
                                    </Link>{' '}
                                    now!
                                </small>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                )}

                <Divider></Divider>

                <Row className='mt-4'>
                    <Col>Subtotal</Col>
                    <Col className='text-right'>P{subtotal}</Col>
                </Row>

                <Row>
                    <Col>
                        Bottle (x
                        {cartItems
                            .filter((item) => item.type.id === 2)
                            .reduce((a, b) => a + b.bottles, 0)}
                        )
                    </Col>
                    <Col className='text-right'>P{bottle}</Col>
                </Row>

                {isDisabled && isLoggedIn && (
                    <Row>
                        <Col>Discount Voucher (0%)</Col>
                        <Col className='text-right'>P{0}</Col>
                    </Row>
                )}

                <Divider></Divider>
                <Row>
                    <Col>Total</Col>
                    <Col className='text-right'>
                        P{total.toFixed(amountPrecision)}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const VoucherInput = ({ disabled }) => {
    return (
        <InputGroup className='voucher-input'>
            <FormControl
                placeholder='Voucher Code'
                aria-label='Voucher Code'
                aria-describedby='Voucher Code'
                disabled={disabled}
            />
            <InputGroup.Append>
                <Button variant='outline-secondary'>APPLY</Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default CartContainer;
