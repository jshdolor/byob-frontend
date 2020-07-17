import { TOGGLE_CART_MENU } from './actions';

const initialState = {
    open: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_CART_MENU:
            return { ...state, open: payload || !state.open };

        default:
            return state;
    }
};
