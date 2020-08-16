import CartService from '~/services/Cart/CartService';

import { SET_CART_ITEMS, RESET_CART } from '~/store/cart/actions';

const postLogin = async (useLocalCart = false) => {
    try {
        const userCart = await CartService.getCart();

        const forLocal = userCart.map((item) => {
            return {
                product_id: item.product_id,
                qty: item.qty,
                type: item.type,
            };
        });

        window.Store.dispatch({
            type: RESET_CART,
            payload: [],
        });

        window.Store.dispatch({
            type: SET_CART_ITEMS,
            payload: forLocal,
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export default postLogin;
