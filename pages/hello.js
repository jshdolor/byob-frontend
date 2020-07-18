import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const Hello = () => {
    const [word, setWord] = useState('');

    useEffect(() => {
        const socket = io();
        socket.on('now', (data) => {
            console.log(data);
            setWord(data.message);
        });

        socket.on('newCart', (data) => {
            console.log(data);
            setWord(data.length);
        });
    }, []);

    return <h1>{word}</h1>;
};

export default Hello;
