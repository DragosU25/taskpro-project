import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addColumn,
  editColumn,
  getColumns,
} from "../../redux/column/operators";
import styles from "./AddColumnForm.module.css";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import Icon from "../common/SvgIcon/SvgIcon";

function AddColumnForm({ handleModalClose, column = null }) {
  const { id: projectId } = useParams();
  const dispatch = useDispatch();

  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (column) {
      setColumnName(column.columnName || "");
    }
  }, [column]);

  const handleInputChange = (e) => {
    setColumnName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (column) {
        // Editare coloană
        const columnId = column._id;
        const result = await dispatch(
          dispatch(
            editColumn({
              columnId,
              updateData: { columnName: columnName },
            })
          )
        );
        if (editColumn.rejected.match(result)) {
          setError(result.payload?.message || "Failed to edit column.");
        } else {
          dispatch(getColumns(projectId));
          handleModalClose();
        }
      } else {
        // Adăugare coloană
        const result = await dispatch(addColumn({ columnName, projectId }));
        if (addColumn.rejected.match(result)) {
          setError(result.payload?.message || "Failed to add column.");
        } else {
          dispatch(getColumns(projectId));
          handleModalClose();
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{column ? "Edit Column" : "Add Column"}</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          placeholder="Title"
          value={columnName}
          handleChange={handleInputChange}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button extraClass={styles.button} type="submit">
          <div className={styles.iconContainer}>
            <Icon
              name={column ? "edit" : "plus"}
              size={16}
              extraClass={styles.icon}
            />
          </div>
          {column ? "Save Changes" : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default AddColumnForm;
