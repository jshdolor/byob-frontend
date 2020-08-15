import ProfileService from '~/services/ProfileService';
import Router from 'next/router';

const hasAuth = async (ctx) => {
    const { req, res } = ctx;
    const isServer = !!req;
    const isBrowser = !req;

    if (isServer) {
        try {
            console.log(ctx);
            await ProfileService.get(ctx);
            res.writeHead(302, { Location: '/' });
            res.end();
        } catch (e) {
            console.log(e);
        }
    }

    if (isBrowser) {
        try {
            await ProfileService.get(null);
            Router.replace('/');
        } catch (e) {}
    }
};

export default hasAuth;
