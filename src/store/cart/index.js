import { ADD_CART_ITEM, REMOVE_CART_ITEM, SET_CART_ITEMS } from './actions';
import io from 'socket.io-client';

const initialState = [];

export default (state = initialState, { type, payload }) => {
    let updatedState = state;
    switch (type) {
        case ADD_CART_ITEM:
            updatedState = [...state, payload];
            break;

        case SET_CART_ITEMS:
            updatedState = [...payload];
            break;

        default:
            updatedState = state;
    }

    const socket = io();
    socket.emit('setCart', updatedState);

    return updatedState;
};
