import React from "react";
import { HiX } from "react-icons/hi";
import styles from "./Modal.module.css"; // Asigură-te că ai stiluri pentru modal

const Modal = ({ children, handleModalClose, isVisible, extraClass }) => {
  if (!isVisible) return null; // Modalul nu este redat dacă nu este vizibil

  return (
    <div className={styles.modalOverlay} onClick={handleModalClose}>
      <div
        className={`${styles.modalContent}  ${extraClass}`}
        onClick={(e) => e.stopPropagation()} // Previne închiderea când se face click în interiorul modalului
      >
        <button className={styles.closeButton} onClick={handleModalClose}>
          <HiX size="20px" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
