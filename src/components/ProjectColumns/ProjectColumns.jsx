import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getColumns } from "../../redux/column/operators";
import {
  selectColumns,
  selectIsLoading,
  selectError,
} from "../../redux/column/selectors";
import styles from "./ProjectColumns.module.css";
import Column from "../Column/Column";
import Button from "../common/Button/Button";
import Icon from "../common/SvgIcon/SvgIcon";
import Modal from "../common/Modal/Modal";
import AddColumnForm from "../AddColumnForm/AddColumnForm";
import { resetColumnsState } from "../../redux/column/slice";

function ProjectColumns() {
  const { id: projectId } = useParams();
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalOpen = (content) => {
    if (content) {
      setModalContent(content);
      setModalVisible(true);
    } else {
      console.error("Invalid content passed to modal.");
    }
  };

  const handleModalClose = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const handleAddColumn = () => {
    handleModalOpen(<AddColumnForm handleModalClose={handleModalClose} />);
  };

  useEffect(() => {
    dispatch(resetColumnsState());
    if (projectId) {
      dispatch(getColumns(projectId));
    }
    return () => {
      dispatch(resetColumnsState());
    };
  }, [dispatch, projectId]);

  if (isLoading) return <p>Loading columns...</p>;
  if (error) return <p>Error loading columns: {error}</p>;

  return (
    <>
      <div className={styles.column}>
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        <div className={styles.addContainer}>
          <Button extraClass={styles.button} handlerFunction={handleAddColumn}>
            <Icon name={"plus"} size={14} extraClass={styles.icon} />
          </Button>

          <p className={styles.text}> Add another column</p>
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        handleModalClose={handleModalClose}
        extraClass={styles.modal}
      >
        {modalContent ? modalContent : null}
      </Modal>
    </>
  );
}

export default ProjectColumns;
