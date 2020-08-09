const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = 3000;

io.on('connect', (socket) => {
    //fire when connected to get the current count on the local storage
    io.sockets.emit('newCart', true);

    socket.on('setCart', (foo) => {
        io.sockets.emit('newCart', true);
    });

    socket.on('userLogin', () => {
        io.sockets.emit('userLoggedIn', true);
        socket.join('joshua');
    });

    socket.on('userLogout', () => {
        io.sockets.emit('userLoggedOut', true);
    });
});

io.on('connection', (socket) => {
    setInterval(() => {
        socket.to('joshua').emit('test', 'yow');
    }, 3000);
});

nextApp.prepare().then(() => {
    //can handle middleware here..

    // app.get('/account(/*)?', async (req, res) => {
    //     console.log('hit');
    //     try {
    //         const d = await ProfileService.get(req);
    //         nextHandler(req, res);
    //     } catch (e) {
    //         console.log(e);

    //         io.on('connect', (socket) => {
    //             io.sockets.emit('userLoggedOut', true);
    //         });
    //         res.redirect(301, '/login');
    //     }
    // });

    app.get('*', (req, res) => {
        nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${port}`);
    });
});
