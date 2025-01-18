import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, handlerFunction, ...rest }) => {
  return (
    <button className={styles.button} onClick={handlerFunction} {...rest}>
      {children}
    </button>
  );
};

export default Button;
