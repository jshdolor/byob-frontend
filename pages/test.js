import Head from 'next/head';
import AppLayout from '~/layouts/App';
import { Container, Button } from 'react-bootstrap';

import { addCartItem } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

const Test = (props) => {
    const item = {
        id: 1,
        name: 'blah',
        price: 200,
        quantity: 2,
    };

    return (
        <AppLayout>
            <Head>
                <title>BYOB | Home</title>
            </Head>
            <Container>
                <div className='my-3 byob-title'>.byob-title</div>
                <div className='my-3 byob-title text-primary'>
                    .byob-title.text-primary
                </div>
                <div className='my-3 byob-title text-primary text-uppercase'>
                    .byob-title.text-primary.text-uppercase
                </div>
                <div className='my-3 byob-text-small'>.byob-text-small</div>
                <div className='my-3 byob-title byob-text-small text-uppercase'>
                    .byob-title.byob-text-small.text-uppercase
                </div>
                <Button
                    onClick={(e) => {
                        props.addCartItem(item);
                    }}
                >
                    Add Cart
                </Button>
            </Container>
        </AppLayout>
    );
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            addCartItem,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
