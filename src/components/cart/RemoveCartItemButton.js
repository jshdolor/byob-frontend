import { FaTrashAlt } from 'react-icons/fa';
import CartService from '~/services/Cart/CartService';

import { RESET_CART, SET_CART_ITEMS } from '~/store/cart/actions';

const handle = async (product_id) => {
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
            className='float-right'
            onClick={() => handle(id)}
        ></FaTrashAlt>
    );
};

export default RemoveCartItemButton;
