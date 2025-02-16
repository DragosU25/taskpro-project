import React from "react";
import styles from "./Boards.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import Button from "../common/Button/Button";

function Boards({ handleModalOpen }) {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>My Boards</h2>
        <div className={styles.addButtonContainer}>
          <p className={styles.text}>Create a new board</p>
          <Button
            extraClass={styles.button}
            handlerFunction={handleModalOpen}
            ariaLabel={"add button"}
          >
            <Icon name={"plus"} size={20} extraClass={styles.icon} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Boards;
