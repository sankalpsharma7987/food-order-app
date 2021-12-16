import { useReducer } from "react";
import CartContext from "./cart-context";

let localStorageCartState = null;

if (localStorage.getItem("cartState")) {
  localStorageCartState = JSON.parse(localStorage.getItem("cartState"));
}

const initialCartState = {
  items: [],
  totalAmount: 0,
  isReadyToCheckout: false,
};
const defaultCartState =
  localStorageCartState !== null ? localStorageCartState : initialCartState;

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
    /* In either case, return the new state of the cart reducer with the updated Item values and total amount */
    const newCartState = {
      items: updatedItems,
      totalAmount: Math.round(updatedTotalAmount * 100, 2) / 100,
      isReadyToCheckout: false,
    };

    localStorage.setItem("cartState", JSON.stringify(newCartState));
    return newCartState; //Returns new cart state with updated items and updated total amount
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

    const newCartState = {
      items: updatedItems,
      totalAmount: Math.round(updatedTotalAmount * 100, 2) / 100,
      isReadyToCheckout: false,
    };

    localStorage.setItem("cartState", JSON.stringify(newCartState));
    return newCartState;
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

    const newCartState = {
      items: updatedItems,
      totalAmount: Math.round(updatedTotalAmount * 100, 2) / 100,
      isReadyToCheckout: false,
    };

    localStorage.setItem("cartState", JSON.stringify(newCartState));
    return newCartState;
  }

  if (action.type === "VALIDATE_ITEM_QUANITY") {
    const exceedingQuantityItem = cartState.items.find(
      (item) => item.amount > 5
    );
    const isReadyToCheckout = exceedingQuantityItem ? false : true;
    const newCartState = { ...cartState, isReadyToCheckout };
    return newCartState;
  }
  if (action.type === "DEFAULT") {
    localStorage.removeItem("cartState");
    return initialCartState;
  }
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

  const validateItemQuantityHandler = () => {
    dispatchCartAction({
      type: "VALIDATE_ITEM_QUANITY",
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
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
