import { createStore, combineReducers } from 'redux';

import cartMenu from '~/store/cartMenu';
import cart from '~/store/cart';
import session from '~/store/session';
import checkout from '~/store/checkout';
import expressCart from '~/store/express-cart';

export const rootReducer = combineReducers({
    cart,
    cartMenu,
    session,
    checkout,
    expressCart,
});

const store = createStore(rootReducer);

export default store;
