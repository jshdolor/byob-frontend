import { createStore, combineReducers } from 'redux';

import cartMenu from '~/store/cartMenu';
import cart from '~/store/cart';

export const rootReducer = combineReducers({
    cart,
    cartMenu,
});

const store = createStore(rootReducer);

export default store;
