import React, { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const [isCheckout, setIsCheckout] = useState(false);

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
    setIsCheckout(true);
  };

  const confirmHandler = async (userDataObj) => {
    const bodyObj = {
      user: userDataObj,
      order: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      totalItems: cartCtx.items.length,
    };

    setIsSubmitting(true);
    try {
      await sendRequest({
        url: `https://react-food-ord-default-rtdb.firebaseio.com/orders.json`,
        method: "POST",
        body: bodyObj,
        headers: { "Content-Type": "application/json" },
      });
      setDidSubmit(true);
      cartCtx.resetCart();
      setIsCheckout(false);
    } catch (e) {
      setDidSubmit(false);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
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
    <React.Fragment>
      <p> Hang tight. We are processing your order!!</p>
    </React.Fragment>
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
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && hasItems && (
        <Checkout onCancel={props.onClose} onConfirm={confirmHandler} />
      )}
      {!isCheckout && modalActions}
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
