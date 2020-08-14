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
import { combineDistinctCartItems } from '~/helpers';
const socket = io();

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
            break;

        case DECREMENT_ITEM:
            updatedState = updatedState
                .map((item) => {
                    if (item.product_id === payload) {
                        item.qty = item.qty - 1;
                    }
                    return item;
                })
                .filter((item) => item.qty !== 0);
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case REMOVE_CART_ITEM:
            updatedState = updatedState.filter((item) => {
                return item.product_id !== payload;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case SET_CART_ITEM:
            updatedState = updatedState.map((item) => {
                if (item.product_id === payload.id) {
                    item.qty = payload.qty;
                }
                return item;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;
        ////

        case ADD_CART_ITEM:
            updatedState = combineDistinctCartItems(updatedState, payload);
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case SET_CART_ITEMS:
            updatedState = [...updatedState, ...payload];

            if (updatedState.length !== 0) {
                ClientStorage.set('cart', updatedState);
                socket.emit('setCart', updatedState);
            }
            updatedState = payload;

            break;
        case SET_CART:
            updatedState = [...payload];
            break;

        case RESET_CART:
            updatedState = [];
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        default:
            updatedState = state;
    }
    console.log(updatedState);
    return updatedState;
};
