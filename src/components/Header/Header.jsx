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
import { blankProfileImg } from "../../utils";

function Header({ toggleSidebar }) {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const avatarPath = useSelector(selectAvatarPath);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (avatarPath) {
      setAvatarUrl(`http://localhost:5000${avatarPath}`);
    }
  }, [avatarPath]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, email, username]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Open Menu"
      >
        <FiMenu size={24} />
      </button>

      <div className={styles.container}>
        <ThemeSwitcher />

        <div className={styles.userContainer}>
          <button
            type="button"
            className={styles.name}
            onClick={toggleModal}
            aria-label="open edit form"
          >
            {username || "Guest"}
          </button>
          <div className={styles.avatar}>
            <img
              src={avatarUrl || blankProfileImg}
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
