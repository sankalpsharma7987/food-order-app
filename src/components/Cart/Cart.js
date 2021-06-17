import {useContext} from "react";
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length>0;

  const removeCartItemHandler = (id)=>{}
  
  const addCartItemHandler = (item)=>{}

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        // <li>{item.name}</li>
        <CartItem key = {item.id} amount = {item.amount} price = {item.price} name = {item.name} onRemove = {removeCartItemHandler} onAdd = {addCartItemHandler}/>
      ))}
    </ul>
  );

  return (
    <Modal onModalClick = {props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick ={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;