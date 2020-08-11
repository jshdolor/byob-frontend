import SetCartRequest from '~/services/Cart/requests/SetCartRequest';
import CartService from '~/services/Cart/CartService';
import ClientStorage from '~/lib/ClientStorage';

import { SET_CART_ITEMS } from '~/store/cart/actions';

const postLogin = async () => {
    const localCart = ClientStorage.get('cart');
    const hasCartItemsOnLocal = localCart.length > 0;

    try {
        let newCart = [];
        if (hasCartItemsOnLocal) {
            const localCartRequest = new SetCartRequest(localCart);
            newCart = await CartService.setCart(localCartRequest.getCart());
        } else {
            newCart = await CartService.getCart();
        }
        const forLocal = newCart.map((item) => {
            return {
                product_id: item.product_id,
                qty: item.qty,
            };
        });

        window.Store.dispatch({
            type: SET_CART_ITEMS,
            payload: forLocal,
        });
        console.log(forLocal);
    } catch (e) {
        throw e;
    }
};

export default postLogin;
