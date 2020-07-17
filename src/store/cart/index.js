import { ADD_CART_ITEM, REMOVE_CART_ITEM, SET_CART_ITEMS } from './actions';

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CART_ITEM:
            return [...state, payload];

        case SET_CART_ITEMS:
            return [...payload];

        default:
            return state;
    }
};
