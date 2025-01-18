import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvatarPath,
  selectEmail,
  selectUserName,
} from "../../redux/auth/selectors";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Modal from "../common/Modal/Modal";
import EditForm from "../EditForm/EditForm";
import { getCurrentUser } from "../../redux/auth/operators";

function Header({ toggleSidebar }) {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const avatarPath = useSelector(selectAvatarPath);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Stare pentru deschiderea modalului

  useEffect(() => {
    if (avatarPath) {
      setAvatarUrl(`http://localhost:5000${avatarPath}`);
    }
  }, [avatarPath]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [email, username]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Comută starea modalului
  };

  return (
    <header className={styles.header}>
      {/* Buton pentru deschiderea sidebar-ului */}
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      <div className={styles.container}>
        {/* Schimbătorul de teme */}
        <ThemeSwitcher />

        {/* Utilizatorul */}
        <div className={styles.userContainer}>
          <button type="button" className={styles.name} onClick={toggleModal}>
            {username || "Guest"}
          </button>
          <div className={styles.avatar}>
            <img
              src={avatarUrl || "/default-avatar.png"}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>

      {/* Modalul */}
      <Modal isVisible={isModalOpen} handleModalClose={toggleModal}>
        <EditForm avatarPath={avatarUrl} name={username} email={email} />
      </Modal>
    </header>
  );
}

export default Header;
