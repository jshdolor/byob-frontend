const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let interval;

io.on('connect', (socket) => {
    io.sockets.emit('newCart', true);

    //fire when connected to get the current count on the local storage
    io.sockets.emit('newCart', true);

    socket.on('setCart', (foo) => {
        io.sockets.emit('newCart', true);
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${port}`);
    });
});
