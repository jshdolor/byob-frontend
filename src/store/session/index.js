import { LOGIN_USER, LOGOUT_USER, SET_USER } from './actions';
import io from 'socket.io-client';
import CookieManager from '~/lib/CookieManager';
import ClientStorage from '~/lib/ClientStorage';

const socket = io();

const initialState = {
    isLoggedIn: !!CookieManager.get('b-at'),
    user: {},
};

export default (state = initialState, { type, payload }) => {
    let updatedState = state;

    switch (type) {
        case LOGIN_USER:
            updatedState = { ...state, isLoggedIn: true };
            socket.emit('userLogin', updatedState);
            break;

        case LOGOUT_USER:
            updatedState = { ...state, isLoggedIn: false };
            socket.emit('userLogout', updatedState);
            socket.emit('setCart', []);
            ClientStorage.set('cart', []);
            CookieManager.delete('b-at');
            break;
        case SET_USER:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }

    return updatedState;
};
