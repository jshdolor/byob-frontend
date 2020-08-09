import { TOGGLE_HEADER } from './actions';

const initialState = {
    show: true,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_HEADER:
            return { ...state, show: payload || !state.show };

        default:
            return state;
    }
};
