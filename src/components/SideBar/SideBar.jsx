import React, { forwardRef, useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import { logoutUser } from "../../redux/auth/operators";
import Modal from "../common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button/Button";
import LogoContainer from "../common/LogoContainer/LogoContainer";
import Boards from "../Boards/Boards";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import { selectProject } from "../../redux/project/selectors";
import { getProjects } from "../../redux/project/operators";
import AddBoardForm from "../AddBoardForm/AddBoardForm";
import EditBoardForm from "../EditBoardForm/EditBoardForm";

const SideBar = forwardRef(({ isSidebarOpen }, ref) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProject);

  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleModalClose();
  };

  const handleLogoutClick = () => {
    handleModalOpen(
      <div className={styles.modalContent}>
        <h2 className={styles.modalText}>Are you sure you want to logout?</h2>
        <div className={styles.modalButtons}>
          <Button handlerFunction={handleLogout}>Yes</Button>
          <Button handlerFunction={handleModalClose}>No</Button>
        </div>
      </div>
    );
  };

  const handleAddBoard = () => {
    handleModalOpen(<AddBoardForm />);
  };

  const handleEditBoard = (project) => {
    handleModalOpen(
      <EditBoardForm project={project} onClose={handleModalClose} />
    );
  };

  return (
    <>
      <aside
        ref={ref}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <LogoContainer font={16} extraClass={styles.logoContainer} />
        <Boards handleModalOpen={handleAddBoard} />
        <ProjectsContainer projects={projects} onEdit={handleEditBoard} />
        <Icon name={"logout"} size={24} handlerFunction={handleLogoutClick} />
      </aside>

      <Modal
        isVisible={isModalVisible}
        handleModalClose={handleModalClose}
        extraClass={styles.modal}
      >
        {modalContent}
      </Modal>
    </>
  );
});

export default SideBar;
