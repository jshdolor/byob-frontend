import {
    ADD_CART_ITEM,
    RESET_CART,
    SET_CART_ITEMS,
    INCREMENT_ITEM,
    DECREMENT_ITEM,
} from './actions';
import io from 'socket.io-client';
import ClientStorage from '~/lib/ClientStorage';

const socket = io();

export default (state = [], { type, payload }) => {
    let updatedState = ClientStorage.get('cart') || state;

    switch (type) {
        case INCREMENT_ITEM:
            updatedState = updatedState.map((item) => {
                if (item.id === payload) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            });
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case DECREMENT_ITEM:
            updatedState = updatedState
                .map((item) => {
                    if (item.id === payload) {
                        item.quantity = item.quantity - 1;
                    }
                    return item;
                })
                .filter((item) => item.quantity !== 0);
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case ADD_CART_ITEM:
            updatedState = [...updatedState, payload];
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        case SET_CART_ITEMS:
            if (updatedState.length !== 0) {
                socket.emit('setCart', updatedState);
                ClientStorage.set('cart', updatedState);
            }
            updatedState = payload;

            break;

        case RESET_CART:
            updatedState = [];
            socket.emit('setCart', updatedState);
            ClientStorage.set('cart', updatedState);
            break;

        default:
            updatedState = state;
    }

    return updatedState;
};
