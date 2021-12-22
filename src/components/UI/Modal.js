import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import CartContext from "../../store/cart-context";

const BackDrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onBackDropClick}
      role="presentation"
    />
  );
};

const ModalOverLay = (props) => {
  const cartCtx = useContext(CartContext);
  const modalClass = `${classes.modal} ${
    cartCtx.items.length > 2 ? classes["modal-top"] : ""
  }`;
  return (
    <div className={modalClass}>
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onBackDropClick={props.onModalClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
