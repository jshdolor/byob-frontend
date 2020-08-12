import { FaMinus, FaPlus } from 'react-icons/fa';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InputNumber } from 'antd';

import { decrementItem, incrementItem } from '~/store/cart/actions';
import {
    INCREMENT_ITEM,
    DECREMENT_ITEM,
    SET_CART_ITEM,
    SET_CART_ITEMS,
    RESET_CART,
} from '~/store/cart/actions';

import UpdateCartRequest from '~/services/Cart/requests/UpdateCartRequest';
import CartService from '~/services/Cart/CartService';

const size = '0.9em';

const QuantityModifier = ({
    incrementItem,
    decrementItem,
    id,
    quantity,
    type = 1,
    bottles = 0,
}) => {
    const updateCartItem = async (qty) => {
        if (!window.Store.getState()?.session?.isLoggedIn) {
            if (type === 1) {
                window.Store.dispatch({
                    type: qty > quantity ? INCREMENT_ITEM : DECREMENT_ITEM,
                    payload: id,
                });
                return;
            }

            window.Store.dispatch({
                type: SET_CART_ITEM,
                payload: { id, qty },
            });

            return;
        }

        try {
            let cart = [];
            if (qty > 0) {
                const request = new UpdateCartRequest({ product_id: id, qty });
                cart = await CartService.updateCartItem(request);
            } else {
                cart = await CartService.removeFromCart({
                    product_id: id,
                });
            }

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

    const modifier =
        type?.id === 1 ? (
            <>
                <FaMinus
                    className='mx-1'
                    size={size}
                    onClick={() => {
                        updateCartItem(quantity - 1);
                    }}
                ></FaMinus>
                <span
                    className='mx-1 quantity-count'
                    style={{ fontSize: size }}
                >
                    {quantity}
                </span>
                <FaPlus
                    className='mx-1'
                    size={size}
                    onClick={() => {
                        updateCartItem(quantity + 1);
                    }}
                ></FaPlus>
            </>
        ) : (
            <>
                <InputNumber
                    defaultValue={quantity}
                    step={1}
                    min={1}
                    onChange={updateCartItem}
                    onKeyPress={(e) => console.log(e)}
                />
                <span>{bottles}</span>
            </>
        );
    //TODO: make this debounce
    //TODO: limit

    return <div className='quantity-modifier'>{modifier}</div>;
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            incrementItem,
            decrementItem,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityModifier);
