import classes from "./CartItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

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
          <button onClick={props.onRemove}>
            <DeleteIcon></DeleteIcon>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
