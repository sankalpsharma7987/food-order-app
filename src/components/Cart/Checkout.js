import useInput from "../../hooks/use-input";
import postalValidation from "../../lib/postalValidation";
import textValidation from "../../lib/textValidation";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    enteredValueIsValid: nameInputIsValid,
    valueInputIsInValid: nameInputIsInValid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(textValidation);

  const {
    enteredValue: enteredStreet,
    enteredValueIsValid: streetInputIsValid,
    valueInputIsInValid: streetInputIsInValid,
    valueInputChangeHandler: streetInputChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput(textValidation);

  const {
    enteredValue: enteredPostal,
    enteredValueIsValid: postalInputIsValid,
    valueInputIsInValid: postalInputIsInValid,
    valueInputChangeHandler: postalInputChangeHandler,
    valueInputBlurHandler: postalInputBlurHandler,
    reset: resetPostalInput,
  } = useInput(postalValidation);

  const {
    enteredValue: enteredCity,
    enteredValueIsValid: cityInputIsValid,
    valueInputIsInValid: cityInputIsInValid,
    valueInputChangeHandler: cityInputChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput(textValidation);

  let formIsValid =
    nameInputIsValid &&
    streetInputIsValid &&
    cityInputIsValid &&
    postalInputIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      nameInputBlurHandler();
      streetInputBlurHandler();
      postalInputBlurHandler();
      cityInputBlurHandler();
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  const nameInputClass = `${classes.control} ${
    nameInputIsInValid ? classes.invalid : ""
  }`;
  const streetInputClass = `${classes.control} ${
    streetInputIsInValid ? classes.invalid : ""
  }`;
  const cityInputClass = `${classes.control} ${
    cityInputIsInValid ? classes.invalid : ""
  }`;
  const postalInputClass = `${classes.control} ${
    postalInputIsInValid ? classes.invalid : ""
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameInputIsInValid && <p>Invalid Name. Please enter valid name</p>}

      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
      </div>
      {streetInputIsInValid && <p>Invalid Street. Please enter valid street</p>}

      <div className={postalInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
        />
      </div>
      {postalInputIsInValid && (
        <p>Invalid Postal Code. Please enter valid Postal Code</p>
      )}

      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
      </div>
      {cityInputIsInValid && <p>Invalid Name. Please enter valid city name</p>}

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
