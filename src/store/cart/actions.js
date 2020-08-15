export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const RESET_CART = 'RESET_CART';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const SET_CART_ITEM = 'SET_CART_ITEM';
export const SET_CART = 'SET_CART';
SET_CART;
export const addCartItem = (payload) => ({
    type: ADD_CART_ITEM,
    payload,
});

export const setCartItems = (payload) => ({
    type: SET_CART_ITEMS,
    payload,
});

export const setCartItem = (payload) => ({
    type: SET_CART_ITEM,
    payload,
});

export const resetCart = (payload) => ({
    type: RESET_CART,
    payload: [],
});

export const incrementItem = (id) => ({
    type: INCREMENT_ITEM,
    payload: id,
});

export const decrementItem = (id) => ({
    type: DECREMENT_ITEM,
    payload: id,
});

export const removeCartItem = (id) => ({
    type: REMOVE_CART_ITEM,
    payload: id,
});

export const setCart = (payload) => ({
    type: SET_CART,
    payload,
});
