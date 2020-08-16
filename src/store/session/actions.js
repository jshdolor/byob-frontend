export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER = 'SET_USER';

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload,
});

export const logoutUser = (payload) => ({
    type: LOGOUT_USER,
    payload,
});

export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});
