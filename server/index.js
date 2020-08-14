const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';

const nextAppSettings = {
    dev,
    quiet: process.env.QUIET_MODE === '1',
};

const nextApp = next(nextAppSettings);
const nextHandler = nextApp.getRequestHandler();
const axios = require('axios');
const port = 3000;

app.use(cookieParser('byob0ecom0site0'));

io.on('connection', (socket) => {
    //fire when connected to get the current count on the local storage
    io.sockets.emit('newCart', true);

    socket.on('setCart', (foo) => {
        io.sockets.emit('newCart', true);
    });

    socket.on('userLogin', (details) => {
        io.sockets.emit('userLoggedIn', true);
    });

    socket.on('userLogout', () => {
        io.sockets.emit('userLoggedOut', true);
    });

    //TODO: handle logged in users add to cart on different domains ( mobile x web)
});

nextApp.prepare().then(() => {
    app.get('/registration/step-2', async (req, res) => {
        const regToken = req.query.regToken;
        const url = `${process.env.NEXT_PUBLIC_BYOB_HOST}/api/v1/check-registration-token`;
        try {
            await axios(url, {
                method: 'get',
                responseType: 'application/json',
                headers: {
                    'registration-token': regToken,
                },
            });

            //token is valid
            // byob reg token = brt
            res.cookie('brt', regToken, {
                httpOnly: true,
                maxAge: 1000000000,
                signed: true,
            });

            res.cookie('regtoken', regToken, {
                httpOnly: true,
                maxAge: 100000,
            });

            res.redirect(302, '/signup/final-step');
        } catch (e) {
            //has errors
            res.redirect(302, '/');
        }
    });

    app.get('/signup/final-step', (req, res) => {
        //call check token-->
        const isValid = !!req.signedCookies.brt;
        console.log('is valid', isValid);
        if (!isValid) {
            res.redirect(302, '/');
            return;
        }

        res.cookie('brt', '', {
            httpOnly: true,
            maxAge: 0,
            signed: true,
        });

        nextHandler(req, res);
    });

    app.get('*', (req, res) => {
        nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${port}`);
    });
});
