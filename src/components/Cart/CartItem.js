import classes from "./CartItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const amountClass = `${classes.amount} ${
    props.amount > 5 ? classes.invalid : ""
  }`;

  const quantityValidation = props.amount > 5 && (
    <p>Item Quantity must be between (1-5) </p>
  );

  return (
    <li className={classes["cart-item-layout"]}>
      <div className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={amountClass}>x {props.amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onReduce} title="Decrease Quantity">
            <Remove />
          </button>
          <button onClick={props.onAdd} title="Increase Quantity">
            <AddIcon />
          </button>
          <button onClick={props.onRemove} title="Remove Item">
            <DeleteIcon></DeleteIcon>
          </button>
        </div>
      </div>
      <div className={classes.invalidMessage}>{quantityValidation}</div>
    </li>
  );
};

export default CartItem;
