import { TOGGLE_HEADER } from './actions';

const initialState = {
    open: true,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_HEADER:
            return { ...state, open: payload || !state.open };

        default:
            return state;
    }
};
