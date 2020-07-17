export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEMS';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const addCartItem = (cartItem) => ({
    type: ADD_CART_ITEM,
    cartItem,
});

export const setCartItems = (payload) => ({
    type: SET_CART_ITEMS,
    payload,
});

export const removeCartItem = (payload) => ({
    type: REMOVE_CART_ITEM,
    payload,
});
