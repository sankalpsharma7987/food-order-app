import { useReducer } from "react";
import CartContext from "./cart-context";
import { cartReducer, defaultCartState } from "./cart-reducer";

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeCartItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const reduceCartItemHandler = (id) => {
    dispatchCartAction({ type: "REDUCE_ITEM", id: id });
  };

  const validateItemQuantityHandler = () => {
    dispatchCartAction({
      type: "VALIDATE_ITEM_QUANITY",
    });
  };

  const changeCheckoutHandler = (value) => {
    dispatchCartAction({
      type: "CHANGE_CART_STATUS",
      value: value,
    });
  };

  const resetCartHandler = () => {
    dispatchCartAction({ type: "DEFAULT" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isReadyToCheckout: cartState.isReadyToCheckout,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
    reduceItem: reduceCartItemHandler,
    resetCart: resetCartHandler,
    validateItemQuantity: validateItemQuantityHandler,
    changeCheckoutState: changeCheckoutHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
