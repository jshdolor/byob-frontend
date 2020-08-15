import { createStore, combineReducers } from 'redux';

import cartMenu from '~/store/cartMenu';
import cart from '~/store/cart';
import session from '~/store/session';
import checkout from '~/store/checkout';

export const rootReducer = combineReducers({
    cart,
    cartMenu,
    session,
    checkout,
});

const store = createStore(rootReducer);

export default store;
