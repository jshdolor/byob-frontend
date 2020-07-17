import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const Hello = () => {
    const [word, setWord] = useState('');

    useEffect(() => {
        const socket = io();
        socket.on('now', (data) => {
            setWord(data.length);
        });

        socket.on('newCart', (cart) => {
            console.log(cart);
            setWord(cart.length);
        });
    }, []);

    return <h1>{word}</h1>;
};

export default Hello;
