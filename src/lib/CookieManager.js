import Cookie from 'js-cookie';
import { mergeDeep } from '~/helpers';

const defaultOptions = {
    expires: 7,
    path: '/',
};

export default class Cookies {
    static set(name, value, options) {
        options = mergeDeep(defaultOptions, options);
        Cookie.set(name, value, options);
    }

    static get(name) {
        return Cookie.get(name);
    }

    static delete(name) {
        return Cookie.remove(name);
    }
}
