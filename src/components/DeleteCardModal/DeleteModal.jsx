import React from "react";
import Button from "../common/Button/Button";
import styles from "./DeleteModa.module.css";

function DeleteModal({ title, message, onConfirm, handleModalClose }) {
  const handleConfirm = async () => {
    try {
      await onConfirm(); // Execută funcția de confirmare transmisă ca prop
      handleModalClose(); // Închide modalul după succes
    } catch (error) {
      console.error("Error in DeleteModal:", error); // Gestionează eventuale erori
    }
  };

  return (
    <div className={styles.modalContent}>
      <h3 className={styles.title}>{title || "Confirm Action"}</h3>
      <p className={styles.text}>
        {message || "Are you sure you want to proceed?"}
      </p>
      <div className={styles.buttons}>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={handleModalClose}>No</Button>
      </div>
    </div>
  );
}

export default DeleteModal;
