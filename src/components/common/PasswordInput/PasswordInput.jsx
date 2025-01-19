import React, { useState } from "react";
import styles from "./PasswordInput.module.css";

const PasswordInput = ({ placeholder, id, name, value, handleChange }) => {
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
        className={styles.input}
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

// import styles from "./PasswordInput.module.css";

// const PasswordInput = ({
//   placeholder,
//   id,
//   name,
//   value,
//   handleChange,
//   extraClass,
// }) => {
//   return (
//     <div className={styles.passwordContainer}>
//       <input
//         id={id}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className={`${styles.input} ${extraClass}`}
//       />
//     </div>
//   );
// };

// export default PasswordInput;
