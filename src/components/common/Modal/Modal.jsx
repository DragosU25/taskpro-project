import React from "react";
import { HiX } from "react-icons/hi";
import styles from "./Modal.module.css";

const Modal = ({ children, handleModalClose, isVisible, extraClass }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleModalClose}>
      <div
        className={`${styles.modalContent}  ${extraClass}`}
        onClick={(e) => e.stopPropagation()}
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
