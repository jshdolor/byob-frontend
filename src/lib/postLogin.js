import CartService from '~/services/Cart/CartService';
import { handle as removeItem } from '~/components/cart/RemoveCartItemButton';
import { addToCart as addItem } from '~/components/buttons/addCart';
import { SET_CART_ITEMS, RESET_CART } from '~/store/cart/actions';

const postLogin = async (useLocalCart = false) => {
    try {
        const browserCart = [...window.Store.getState().cart];
        const userCart = await CartService.getCart();

        let forLocal = userCart.map((item) => {
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

        if (useLocalCart) {
            const removePromise = userCart.map(
                async (cart) => await removeItem(cart.product_id)
            );

            await Promise.all(removePromise);

            window.Store.dispatch({
                type: RESET_CART,
                payload: [],
            });

            const addingPromise = browserCart.map(async (cartItem) => {
                const qty = cartItem?.qty;
                const type = cartItem.type;
                const product_id = cartItem?.product_id;

                return await addItem(product_id, type, qty);
            });

            await Promise.all(addingPromise);
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export default postLogin;
