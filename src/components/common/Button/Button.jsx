import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, handlerFunction, extraClass, ...rest }) => {
  return (
    <button
      className={`${styles.button} ${extraClass}`}
      onClick={handlerFunction}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
