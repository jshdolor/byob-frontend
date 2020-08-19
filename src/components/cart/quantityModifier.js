import { FaMinus, FaPlus } from 'react-icons/fa';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Select } from 'antd';
const { Option } = Select;

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
import { refillableOptions, defaultRefillableValue } from '~/config/app';

const size = '0.9em';

const QuantityModifier = ({
    incrementItem,
    decrementItem,
    id,
    disabled = false,
    quantity,
    type = { id: 1 },
}) => {
    const updateCartItem = async (qty) => {
        if (!window.Store.getState()?.session?.isLoggedIn) {
            if (type.id === 1) {
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
            //When logged in, the cart flicker.
            // window.Store.dispatch({
            //     type: RESET_CART,
            //     payload: [],
            // });
            window.Store.dispatch({
                type: SET_CART_ITEMS,
                payload: cart.map((cartItem) => cartItem.getLocalData()),
            });
        } catch (e) {
            throw e;
        }
    };
    const disabledStyle = disabled
        ? {
              fill: '#d7d7d7',
          }
        : {};

    const modifier =
        type?.id === 1 ? (
            <>
                <FaMinus
                    className='mx-1'
                    size={size}
                    style={disabledStyle}
                    onClick={() => {
                        if (!disabled) {
                            updateCartItem(quantity - 1);
                        }
                    }}
                ></FaMinus>
                <span
                    className='mx-1 quantity-count'
                    style={{ fontSize: size }}
                >
                    {quantity}
                </span>
                <FaPlus
                    style={disabledStyle}
                    className='mx-1'
                    size={size}
                    onClick={() => {
                        if (!disabled) {
                            updateCartItem(quantity + 1);
                        }
                    }}
                ></FaPlus>
                <span>pc/s</span>
            </>
        ) : (
            <>
                <Select
                    value={quantity}
                    disabled={disabled}
                    onChange={(value) => {
                        value = isNaN(parseInt(value)) ? 1 : value;
                        value = value < 1 ? 1 : value;
                        updateCartItem(value);
                    }}
                >
                    {refillableOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.text}
                        </Option>
                    ))}
                </Select>
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
