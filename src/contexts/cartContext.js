import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext();

import ProductService from '~/services/Product';

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartMenuStatus, setCartMenuStatus] = useState(false);

    useEffect(async () => {
        const cart = await ProductService.getAll();
        setCart(cart);
    }, []);

    const addCartItem = (cartItem) => {
        setCart([...cart, cartItem]);
    };

    return (
        <CartContext.Provider value={{ cart, addCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
