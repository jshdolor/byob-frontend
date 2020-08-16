import {
    ADD_CART_ITEM,
    RESET_CART,
    SET_CART_ITEMS,
    INCREMENT_ITEM,
    DECREMENT_ITEM,
    REMOVE_CART_ITEM,
    SET_CART_ITEM,
    SET_CART,
} from './actions';
import io from 'socket.io-client';
import ClientStorage from '~/lib/ClientStorage';
const socket = io();
import { combineDistinctCartItems } from '~/helpers';

export default (state = [], { type, payload }) => {
    let updatedState = ClientStorage.get('cart') || state;

    switch (type) {
        case INCREMENT_ITEM:
            updatedState = updatedState.map((item) => {
                if (item.product_id === payload) {
                    item.qty = item.qty + 1;
                }
                return item;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            return state;

        case DECREMENT_ITEM:
            updatedState = updatedState
                .map((item) => {
                    if (item.product_id === payload) {
                        item.qty = item.qty <= 1 ? 1 : item.qty - 1;
                    }
                    return item;
                })
                .filter((item) => item.qty !== 0);
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            return state;

        case REMOVE_CART_ITEM:
            updatedState = updatedState.filter((item) => {
                return item.product_id !== payload;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            return state;

        case SET_CART_ITEM:
            updatedState = updatedState.map((item) => {
                if (item.product_id === payload.id) {
                    item.qty = payload.qty;
                }
                return item;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            return state;
        ////

        case ADD_CART_ITEM:
            updatedState = combineDistinctCartItems(updatedState, payload);
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            return state;

        case SET_CART_ITEMS:
            updatedState = [...payload];

            if (updatedState.length !== 0) {
                ClientStorage.set('cart', updatedState);
                socket.emit('setCart', updatedState);
            }

            return state;

        case SET_CART:
            updatedState = [...payload];
            break;

        case RESET_CART:
            updatedState = [];
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            console.log(RESET_CART);
            break;

        default:
            updatedState = state;
    }
    return updatedState;
};
