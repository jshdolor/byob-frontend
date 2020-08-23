export const SET_EXPRESS_CART = 'SET_EXPRESS_CART';
export const RESET_EXPRESS_CART = 'RESET_EXPRESS_CART';

export const setExpressCart = (payload) => ({
    type: SET_EXPRESS_CART,
    payload,
});

export const resetExpressCart = (payload = []) => ({
    type: RESET_EXPRESS_CART,
    payload,
});
