import Item from './item';
import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { toggleCartMenu } from '~/store/cartMenu/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GrFormClose } from 'react-icons/gr';

const Cart = (props) => {
    const store = useStore();
    const { cart } = store.getState();

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
                        {cart.map((d, i) => (
                            <Item key={i}></Item>
                        ))}
                    </div>
                    <Button block className='mt-4' variant='primary'>
                        Checkout - {10}
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
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
