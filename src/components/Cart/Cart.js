import React, { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import LoadingSpinner from "../UI/LoadingSpinner";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const isReadyToCheckout = cartCtx.isReadyToCheckout;

  const hasItems = cartCtx.items.length > 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isError, setIsError] = useState(false);

  const [orderDidSubmit, setDidSubmit] = useState(false);

  const { sendRequest } = useHttp();

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const reduceCartItemHandler = (id) => {
    cartCtx.reduceItem(id);
  };

  const orderHandler = () => {
    cartCtx.validateItemQuantity();
  };

  const confirmHandler = async (userDataObj) => {
    const bodyObj = {
      user: userDataObj,
      order: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      totalItems: cartCtx.items.length,
    };

    setIsSubmitting(true);

    setTimeout(async () => {
      try {
        await sendRequest({
          url: `https://react-food-ord-default-rtdb.firebaseio.com/orders.json`,
          method: "POST",
          body: bodyObj,
          headers: { "Content-Type": "application/json" },
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.resetCart();
      } catch (e) {
        setIsSubmitting(false);
        setDidSubmit(false);
        setIsError(true);
      }
    }, 1000);
  };

  const cartItemsClass = `${classes["cart-items"]} ${
    cartCtx.isReadyToCheckout ? classes["cart-items-height"] : ""
  }`;

  const cartItems = (
    <ul className={cartItemsClass}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          price={item.price}
          name={item.name}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
          onReduce={reduceCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmittingContent = (
    <div className={classes.submittingContent}>
      <p> Hang tight. We are processing your order!!</p>
      <LoadingSpinner></LoadingSpinner>
    </div>
  );

  const isErrorContent = (
    <React.Fragment>
      <p>Could not process the order. Please reach out to customer support</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully submitted your order.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {hasItems && (
        <div className={classes["cart-message"]}>
          <p> Please add item quantity between 1-5 </p>
        </div>
      )}

      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isReadyToCheckout && hasItems && (
        <Checkout onCancel={props.onClose} onConfirm={confirmHandler} />
      )}
      {!isReadyToCheckout && modalActions}
    </React.Fragment>
  );

  return (
    <Modal onModalClick={props.onClose}>
      {!isSubmitting && !orderDidSubmit && !isError && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && !orderDidSubmit && isError && isErrorContent}
      {!isSubmitting && orderDidSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
