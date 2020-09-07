import Cookie from 'nookies';
import { mergeDeep } from '~/helpers';

const defaultOptions = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
};

export default class Cookies {
    static ctx = null;

    //either for ss or client
    static setContext(ctx) {
        this.ctx = ctx;
        return Cookies;
    }

    static set(name, value, options) {
        options = mergeDeep(defaultOptions, options);
        Cookie.set(this.ctx, name, value, options);
    }

    static get(name) {
        const cookies = Cookie.get(this.ctx);
        return cookies[name] ?? undefined;
    }

    static delete(name) {
        return Cookie.destroy(this.ctx, name);
    }
}
