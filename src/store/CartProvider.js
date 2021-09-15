import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (cartState, action) => {
  if (action.type === "ADD_ITEM") {
    /* Update the total amount based on the item price and item amount */

    const updatedTotalAmount =
      cartState.totalAmount + action.item.price * action.item.amount;

    /* Find if the item in the cart already exist. This is to ensure we do not add duplicate items but instead just add the quantity of the existing item */

    let existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === action.item.id
    );
    let existingCartItem = cartState.items[existingCartItemIndex];
    let updatedItems;

    /* If the item is found in the cart state, then update its amount and create a new object with the updated amount value */

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      /* Add the cart state items to an updatedItems list. Then overwrite the updated Item with the updated Item values. */

      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      /* If the item is to be added for the first time, then simply add the item to the  cart state*/

      updatedItems = cartState.items.concat(action.item);
    }
    /* In enither case, return the new state of the cart reducer with the updated Item values and total amount */
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }; //Returns new cart state with updated items and updated total amount
  }

  if (action.type === "REDUCE_ITEM") {
    const existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = cartState.items[existingCartItemIndex];

    //Not using amount value to multiply. As the amount will always be one;

    const updatedTotalAmount = cartState.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = cartState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };

      updatedItems = [...cartState.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = cartState.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = cartState.items[existingItemIndex];

    const updatedTotalAmount =
      cartState.totalAmount - existingItem.price * existingItem.amount;

    const updatedItems = cartState.items.filter(
      (item) => item.id !== action.id
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
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

  const reduceCartItemHandler = (id) => {
    dispatchCartAction({ type: "REDUCE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: Math.round((cartState.totalAmount*100),2)/100,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
    reduceItem: reduceCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
