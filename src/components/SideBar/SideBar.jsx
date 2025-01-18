import React, { forwardRef, useState } from "react";
import styles from "./SideBar.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import { logoutUser } from "../../redux/auth/operators";
import Modal from "../common/Modal/Modal";
import { useDispatch } from "react-redux";
import Button from "../common/Button/Button";
import LogoContainer from "../common/LogoContainer/LogoContainer";

// Utilizăm forwardRef pentru a permite `ref` să fie atașat la această componentă
const SideBar = forwardRef(({ isSidebarOpen }, ref) => {
  const dispatch = useDispatch();

  // State for controlling modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Function to handle the logout click
  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    dispatch(logoutUser());
    setIsModalVisible(false); // Close the modal after logout
  };

  // Function to cancel logout
  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <aside
        ref={ref}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <LogoContainer font={16} />
        <Icon name={"logout"} size={24} handlerFunction={handleLogoutClick} />
      </aside>

      {isModalVisible && (
        <Modal isVisible={isModalVisible} handleModalClose={cancelLogout}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalText}>
              Are you sure you want to logout?
            </h2>
            <div className={styles.modalButtons}>
              <Button handlerFunction={confirmLogout}> Yes</Button>
              <Button handlerFunction={cancelLogout}>No</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
});

export default SideBar;
