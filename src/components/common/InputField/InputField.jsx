import React from "react";
import styles from "./InputField.module.css";

const InputField = ({
  type = "text",
  placeholder,
  id,
  name,
  value,
  handleChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      className={styles.input}
      required
    />
  );
};

export default InputField;
