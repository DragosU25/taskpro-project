import styles from "./PasswordInput.module.css";

const PasswordInput = ({ placeholder, id, name, value, handleChange }) => {
  return (
    <div className={styles.passwordContainer}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default PasswordInput;
