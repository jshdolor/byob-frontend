import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/cart/item';

const CartContainer = () => {
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems);
    return (
        <div className="checkout-page-container -cart">
            <div className="cart-content">
                <div>
                    {(cartItems || []).map((cartItem, i) => (
                        <CartItem item={cartItem} key={i}></CartItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartContainer;
