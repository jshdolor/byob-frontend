import { createStore, combineReducers } from 'redux';

import cartMenu from '~/store/cartMenu';
import cart from '~/store/cart';
import session from '~/store/session';

export const rootReducer = combineReducers({
    cart,
    cartMenu,
    session,
});

const store = createStore(rootReducer);

export default store;
