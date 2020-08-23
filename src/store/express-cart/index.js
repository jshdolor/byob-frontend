import { SET_EXPRESS_CART, RESET_EXPRESS_CART } from './actions';

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_EXPRESS_CART:
            state = [payload];
            break;

        case RESET_EXPRESS_CART:
            state = [];
            break;

        default:
            return state;
    }

    return state;
};
