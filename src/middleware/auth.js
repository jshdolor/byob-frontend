import ProfileService from '~/services/ProfileService';
import Router from 'next/router';

const authCheck = async (ctx) => {
    const { req, res } = ctx;
    const isServer = !!req;
    const isBrowser = !req;

    if (isServer) {
        try {
            const data = await ProfileService.get(ctx);
        } catch (e) {
            res.writeHead(302, { Location: '/login' });
            res.end();
        }
    }

    if (isBrowser) {
        try {
            const data = await ProfileService.get(null);
        } catch (e) {
            Router.replace('/login');
        }
    }
};

export default authCheck;
