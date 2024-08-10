import React, { createContext, useState } from 'react';

// Create a Cart Context
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Manages the state of the cart
  const [cart, setCart] = useState([]);

  // Function to add or update an item in the cart
  //Receives the quantity from <ProductCard/>
  const addToCart = (item, quantity) => {
    setCart(prevCart => {
      //Get the item's index value
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

      // If item already exists, update the quantity
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        // Set to the new quantity
        updatedCart[existingItemIndex].quantity = quantity; 
        return updatedCart;
      }
      // If item doesn't exist, add it to the cart
      return [...prevCart, { ...item, quantity }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
