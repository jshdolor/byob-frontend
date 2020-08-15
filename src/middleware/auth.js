import ProfileService from '~/services/ProfileService';
import Router from 'next/router';
import CookieManager from '~/lib/CookieManager';

//TODO: EMIT TO SOCKET - USERLOGOUT
const authCheck = async (ctx) => {
    const { req, res } = ctx;
    const isServer = !!req;
    const isBrowser = !req;

    if (isServer) {
        try {
            return await ProfileService.get(ctx);
        } catch (e) {
            CookieManager.delete('b-at');
            res.writeHead(302, { Location: '/login' });
            res.end();
        }
    }

    if (isBrowser) {
        try {
            return await ProfileService.get(null);
        } catch (e) {
            CookieManager.delete('b-at');
            Router.replace('/login');
        }
    }
};

export default authCheck;
