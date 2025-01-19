import React, { useState } from "react";
import styles from "./PasswordInput.module.css";

const PasswordInput = ({
  placeholder,
  id,
  name,
  value,
  handleChange,
  extraClass,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.passwordContainer}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        className={`${styles.input} ${extraClass}`}
      />
      <button
        type="button"
        className={styles.togglePassword}
        onClick={togglePasswordVisibility}
      >
        👁️
      </button>
    </div>
  );
};

export default PasswordInput;
