// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState(() => {
        const savedCartList = localStorage.getItem('cartList');
        return savedCartList ? JSON.parse(savedCartList) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [cartList]);

    const changeQuantity = (id, quantity) => {
        setCartList(prevCartList =>
            prevCartList.map(item =>
                item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
            )
        );
    };

    const handleDelete = (id) => {
        setCartList(prevCartList => prevCartList.filter(item => item.id !== id));
      };

    const handleClear = () => {
        localStorage.clear();
        setCartList([]);
    }

    return (
        <CartContext.Provider value={{ cartList, setCartList, changeQuantity, handleDelete, handleClear }}>
            {children}
        </CartContext.Provider>
    );
};
