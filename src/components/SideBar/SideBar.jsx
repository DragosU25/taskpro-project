import React, { forwardRef, useEffect } from "react";
import styles from "./SideBar.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import { logoutUser } from "../../redux/auth/operators";
import Modal from "../common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button/Button";
import LogoContainer from "../common/LogoContainer/LogoContainer";
import Boards from "../Boards/Boards";
import useModal from "../../hooks/useModal";
import AddBoardForm from "../AddBoardForm/AddBoardForm";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import { selectProject } from "../../redux/project/selectors";
import { getProjects } from "../../redux/project/operators";

const SideBar = forwardRef(({ isSidebarOpen }, ref) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProject); // Assuming this selector gets the list of projects
  const logoutModal = useModal();
  const addModal = useModal();

  //useEffect for projects
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  //handle logout function
  const handleLogout = () => {
    dispatch(logoutUser());
    logoutModal.closeModal(); // Închide modalul după logout
  };

  // open modal for logout
  const handleLogoutClick = () => {
    logoutModal.openModal(
      <div className={styles.modalContent}>
        <h2 className={styles.modalText}>Are you sure you want to logout?</h2>
        <div className={styles.modalButtons}>
          <Button handlerFunction={handleLogout}>Yes</Button>
          <Button handlerFunction={logoutModal.closeModal}>No</Button>
        </div>
      </div>
    );
  };

  //open add modal
  const handleAddBoard = () => {
    addModal.openModal(<AddBoardForm />);
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
        <Boards handleModalOpen={handleAddBoard} />
        <ProjectsContainer projects={projects} />
        <Icon name={"logout"} size={24} handlerFunction={handleLogoutClick} />
      </aside>

      <Modal
        isVisible={logoutModal.isVisible}
        handleModalClose={logoutModal.closeModal}
      >
        {logoutModal.content}
      </Modal>

      <Modal
        isVisible={addModal.isVisible}
        handleModalClose={addModal.closeModal}
        extraClass={styles.modal}
      >
        {addModal.content}
      </Modal>
    </>
  );
});

export default SideBar;
