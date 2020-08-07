import Head from 'next/head';
import AppLayout from '~/layouts/App';
import { Container, Button, Row, Col } from 'react-bootstrap';

import { addCartItem, setCartItems } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientStorage from '~/lib/ClientStorage';

import { useEffect } from 'react';

const Test = (props) => {
    useEffect(() => {
        props.setCartItems(props.cart);
    }, []);

    const price = Math.ceil(Math.random() * 1000).toFixed(2);
    const item = {
        id: Math.ceil(Math.random() * 100),
        name: 'blah',
        price,
        price_currency: 'P' + price,
        description: 'asdas asda asd asd as das das',
        quantity: 1,
        image: 'https://picsum.photos/200/300?random=25',
    };

    return (
        <>
            <Head>
                <title>BYOB | Home</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <div className='my-3 byob-title'>.byob-title</div>
                        <div className='my-3 byob-title text-primary'>
                            .byob-title.text-primary
                        </div>
                        <div className='my-3 byob-title text-primary text-uppercase'>
                            .byob-title.text-primary.text-uppercase
                        </div>
                        <div className='my-3 byob-text-small'>
                            .byob-text-small
                        </div>
                        <div className='my-3 byob-title byob-text-small text-uppercase'>
                            .byob-title.byob-text-small.text-uppercase
                        </div>
                        <div>{JSON.stringify(item)}</div>
                        <Button
                            onClick={(e) => {
                                props.addCartItem(item);
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

Test.getInitialProps = async (ctx) => {
    const cart = ClientStorage.get('cart');
    return { cart };
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            addCartItem,
            setCartItems,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
