import { combineReducers } from 'redux';

import cart from '~/store/cart';
import cartMenu from '~/store/cartMenu';

export default combineReducers({
    cart,
    cartMenu,
});
