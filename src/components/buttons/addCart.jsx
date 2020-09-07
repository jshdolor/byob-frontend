import { Button } from 'react-bootstrap';
import {
    ADD_CART_ITEM,
    SET_CART_ITEMS,
    RESET_CART,
    SET_CART_ITEM,
} from '~/store/cart/actions';
import { TOGGLE_CART_MENU } from '~/store/cartMenu/actions';

import UpdateCartRequest from '~/services/Cart/requests/UpdateCartRequest';
import CartService from '~/services/Cart/CartService';
import { useSelector } from 'react-redux';
import { handle as removeItem } from '~/components/cart/RemoveCartItemButton';
import CookieManager from '~/lib/CookieManager';

//TODO: recode and refactor --- this is a rush project: less if else

const addToCart = async (product_id, type, qty = 1, alreadyInCart = false) => {
    if (!CookieManager.get('b-at')) {
        window.location.reload();
    }

    if (type.id === 2) {
        qty = qty === 1 ? 250 : qty;
    }

    const item = {
        product_id,
        qty,
        type,
    };
    if (!window.Store.getState()?.session?.isLoggedIn) {
        if (type.id === 2 && alreadyInCart) {
            window.Store.dispatch({
                type: SET_CART_ITEM,
                payload: { id: product_id, qty },
            });
        } else {
            window.Store.dispatch({
                type: ADD_CART_ITEM,
                payload: item,
            });
        }

        return;
    }

    const request = new UpdateCartRequest(item);
    try {
        if (type.id === 2 && alreadyInCart) {
            // remove item before submitting;
            await removeItem(item.product_id);
        }

        const cart = await CartService.updateCart(request);
        window.Store.dispatch({
            type: SET_CART_ITEMS,
            payload: cart.map((cartItem) => cartItem.getLocalData()),
        });
    } catch (e) {
        throw e;
    }
};

const openCartMenu = () => {
    if (!CookieManager.get('b-at')) {
        window.location.reload();
    }

    window.Store.dispatch({
        type: TOGGLE_CART_MENU,
        payload: true,
    });
};

const addCart = (props) => {
    const cart = useSelector((state) => state.cart) || [];

    const {
        id,
        text = 'Add to Cart',
        cls = 'py-0 px-0 text-primary text-capitalize',
        style,
        qty = 1,
        type,
        children,
        className,
    } = props;

    const handleClick = () => {
        const alreadyInCart = cart.find(
            (cartItem) => cartItem.product_id === id
        );

        addToCart(id, type, qty, alreadyInCart).then(() => {
            openCartMenu();
        });
    };

    return children ? (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    ) : (
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

export { addToCart };
export default addCart;
