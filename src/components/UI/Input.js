import React from "react";
import classes from "./Input.module.css";

/*The Input function component is wrapped in forwardRef function to get reference passed to it from the Input custom component call
For e.g. in the case of MealItemForm, the amountInputRef is forwarded to this Input function component*/

const Input = React.forwardRef((props,ref) => { 
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref}{...props.input} />
    </div>
  );
});

export default Input;
