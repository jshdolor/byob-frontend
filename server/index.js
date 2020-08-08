const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

io.on('connect', (socket) => {
    //fire when connected to get the current count on the local storage
    io.sockets.emit('newCart', true);

    socket.on('setCart', (foo) => {
        io.sockets.emit('newCart', true);
    });

    socket.on('userLogin', () => {
        console.log('login');
        io.sockets.emit('userLoggedIn', true);
    });

    socket.on('userLogout', () => {
        console.log('logout');
        io.sockets.emit('userLoggedOut', true);
    });
});

nextApp.prepare().then(() => {
    //can handle middleware here..

    app.get('*', (req, res) => {
        nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${port}`);
    });
});
