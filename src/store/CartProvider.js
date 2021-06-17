import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (prevCartState, action) => {

  if (action.type === "ADD_ITEM") {
    const updatedItems = prevCartState.items.concat(action.item);
    const updatedTotalAmount =
      prevCartState.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount }; //Returns new cart state with updated items and updated total amount
  }


  return defaultCartState;
};

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

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
