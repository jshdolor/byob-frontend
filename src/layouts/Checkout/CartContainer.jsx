import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/cart/item';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { amountPrecision, bottlePrice } from '~/config/app';
import { Divider } from 'antd';

const CartContainer = () => {
    const cartItems = useSelector((state) => state.cart);
    const { currentStep } = useSelector((state) => state.checkout);
    const cartCount = (cartItems || []).reduce((a, b) => {
        if (b.type.id === 1) {
            return a + b.qty;
        }
        return a + Math.ceil(b.qty / bottlePerMl);
    }, 0);
    const isDisabled = currentStep > 0;
    const subtotal = (cartItems || [])
        .reduce((a, b) => a + parseFloat(b.total) ?? 0, 0)
        .toFixed(amountPrecision);
    const bottle = cartItems
        .filter((item) => item.type.id === 2)
        .reduce((a, b) => a + b.bottles * bottlePrice, 0)
        .toFixed(amountPrecision);
    const total = parseFloat(subtotal) + parseFloat(bottle);
    console.log(subtotal, bottle);
    return (
        <div id="checkout-cart" className="checkout-page-container -cart">
            <div className="cart-content">
                <div>
                    {(cartItems || []).map((cartItem, i) => (
                        <CartItem
                            disabled={isDisabled}
                            checkout
                            item={cartItem}
                            key={i}
                        ></CartItem>
                    ))}
                </div>
                <Row className="mt-4 ">
                    <Col className={'byod -regular-font'}>
                        Total Number of Items: <em>{cartCount}</em>
                    </Col>
                </Row>
                <Divider />
                <Row className="mt-4">
                    <Col>Subtotal</Col>
                    <Col className="text-right">P{subtotal}</Col>
                </Row>
                <Row>
                    <Col>
                        Bottle (x
                        {cartItems
                            .filter((item) => item.type.id === 2)
                            .reduce((a, b) => a + b.bottles, 0)}
                        )
                    </Col>
                    <Col className="text-right">P{bottle}</Col>
                </Row>
                <Divider />
                <Row>
                    <Col>Total</Col>
                    <Col className="text-right">
                        P{total.toFixed(amountPrecision)}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CartContainer;
