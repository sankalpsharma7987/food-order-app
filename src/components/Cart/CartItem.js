import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartItemRemoveClass = `${classes["cart-item"]} ${classes["cart-item-remove"]}`;

  return (
    <li className={classes["cart-item-layout"]}>
      <div className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {props.amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onReduce}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </div>
      <div className={cartItemRemoveClass}>
        <button onClick={props.onRemove}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;
