import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  isReadyToCheckout: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  reduceItem: (id) => {},
  resetCart: () => {},
  validateItemQuantity: () => {},
  changeCheckoutState: (value) => {},
});

export default CartContext;
