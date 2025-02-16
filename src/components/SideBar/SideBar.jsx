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
import { deleteProject, getProjects } from "../../redux/project/operators";
import AddBoardForm from "../AddBoardForm/AddBoardForm";
import EditBoardForm from "../EditBoardForm/EditBoardForm";
import HelpContainer from "../HelpContainer/HelpContainer";
import DeleteModal from "../DeleteCardModal/DeleteModal";

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
          <Button handlerFunction={handleLogout} extraClass={styles.button}>
            Yes
          </Button>
          <Button handlerFunction={handleModalClose} extraClass={styles.button}>
            No
          </Button>
        </div>
      </div>
    );
  };

  const handleAddBoard = () => {
    handleModalOpen(<AddBoardForm handleModalClose={handleModalClose} />);
  };

  const handleEditBoard = (project) => {
    handleModalOpen(
      <EditBoardForm project={project} onClose={handleModalClose} />
    );
  };

  const handleDeleteBoard = (id) => {
    handleModalOpen(
      <DeleteModal
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        handleModalClose={handleModalClose}
        onConfirm={() =>
          dispatch(deleteProject(id))
            .unwrap()
            .then(() => console.log("Project deleted successfully"))
            .catch((error) => console.error("Failed to delete project:", error))
        }
      />
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
        <ProjectsContainer
          projects={projects}
          onEdit={handleEditBoard}
          onDelete={handleDeleteBoard}
        />

        <HelpContainer />
        <Button
          extraClass={styles.logoutContainer}
          handlerFunction={handleLogoutClick}
        >
          <Icon name={"logout"} size={24} extraClass={styles.icon} />
          <span>Log out </span>
        </Button>
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
