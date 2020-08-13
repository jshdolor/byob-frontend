import { FaTrashAlt } from 'react-icons/fa';
import CartService from '~/services/Cart/CartService';

import {
    RESET_CART,
    SET_CART_ITEMS,
    REMOVE_CART_ITEM,
} from '~/store/cart/actions';

const handle = async (product_id) => {
    if (!window.Store.getState()?.session?.isLoggedIn) {
        window.Store.dispatch({
            type: REMOVE_CART_ITEM,
            payload: product_id,
        });
        return;
    }

    try {
        const cart = await CartService.removeFromCart({ product_id });
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

const RemoveCartItemButton = ({ id }) => {
    return (
        <FaTrashAlt
            size='1.3em'
            className='position-absolute text-primary'
            style={{ bottom: 0, right: 0 }}
            onClick={() => handle(id)}
        ></FaTrashAlt>
    );
};

export default RemoveCartItemButton;
