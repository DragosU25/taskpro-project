import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  handlerFunction,
  extraClass,
  ariaLabel,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${extraClass}`}
      onClick={handlerFunction}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
