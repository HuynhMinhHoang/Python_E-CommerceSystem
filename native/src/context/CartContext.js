import React, { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

export const CartProvider = ({ initialState, reducer, children }) => (
  <CartContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CartContext.Provider>
);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
