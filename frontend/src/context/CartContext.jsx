import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { token } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!token) {
            setCart(null);
            return;
        }
        try {
            const res = await axios.get('/cart');
            setCart(res.data);
        } catch (err) {
            console.error('Error fetching cart', err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const addToCart = async (productId, quantity = 1) => {
        if (!token) return alert('Please login first');
        try {
            const res = await axios.post('/cart/add', { productId, quantity });
            setCart(res.data);
        } catch (err) {
            console.error('Error adding to cart', err);
        }
    };

    const removeFromCart = async (productId) => {
        if (!token) return;
        try {
            const res = await axios.post('/cart/remove', { productId });
            setCart(res.data);
        } catch (err) {
            console.error('Error removing from cart', err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
