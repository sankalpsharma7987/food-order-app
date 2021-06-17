import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (prevCartState, action) => {

  if (action.type === "ADD_ITEM") 
  {

    /* Update the total amount based on the item price and item amount */

    const updatedTotalAmount =
      prevCartState.totalAmount + action.item.price * action.item.amount;

    /* Find if the item in the cart already exist. This is to ensure we do not add duplicate items but instead just add the quantity of the existing item */

    let existingCartItemIndex = prevCartState.items.findIndex((item)=>item.id === action.item.id)
    let existingCartItem = prevCartState.items[existingCartItemIndex];
    let updatedItems;

    /* If the item is found in the cart state, then update its amount and create a new object with the updated amount value */

    if(existingCartItem)
    {
        
        const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount+action.item.amount
        }

        /* Add the cart state items to an updatedItems list. Then update the item with the new updated item object value. */

        updatedItems = [...prevCartState.items];
        updatedItems[existingCartItemIndex] = updatedItem;
       

    }


    else {

        /* If the item is to be added for the first time, then simply add the item to the  cart state*/

        updatedItems = prevCartState.items.concat(action.item);

    }
    /* In enither case, return the new state of the cart reducer with the updated Item values and total amount */
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
