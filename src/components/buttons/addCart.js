import { Button } from 'react-bootstrap';
import {
    ADD_CART_ITEM,
    SET_CART_ITEMS,
    RESET_CART,
} from '~/store/cart/actions';
import { TOGGLE_CART_MENU } from '~/store/cartMenu/actions';

import UpdateCartRequest from '~/services/Cart/requests/UpdateCartRequest';
import CartService from '~/services/Cart/CartService';

const addToCart = async (product_id, type) => {
    const item = {
        product_id,
        qty: 1,
        type,
    };

    if (!window.Store.getState()?.session?.isLoggedIn) {
        window.Store.dispatch({
            type: ADD_CART_ITEM,
            payload: item,
        });
        return;
    }

    const request = new UpdateCartRequest(item);
    try {
        const cart = await CartService.updateCart(request);
        console.log(cart);
        window.Store.dispatch({
            type: RESET_CART,
            payload: [],
        });

        window.Store.dispatch({
            type: SET_CART_ITEMS,
            payload: cart.map((cartItem) => cartItem.getLocalData()),
        });
    } catch (e) {
        throw e;
    }
};

const openCartMenu = () => {
    window.Store.dispatch({
        type: TOGGLE_CART_MENU,
        payload: true,
    });
};

const addCart = (props) => {
    const {
        id,
        text = 'Add to Cart',
        cls = 'py-0 px-0 text-primary text-capitalize',
        style,
        type,
    } = props;

    const handleClick = () => {
        addToCart(id, type).then(() => {
            openCartMenu();
        });
    };

    return (
        <Button
            onClick={handleClick}
            variant='link'
            className={`add-to-cart ${cls}`}
            style={style}
        >
            {text}
        </Button>
    );
};

export default addCart;