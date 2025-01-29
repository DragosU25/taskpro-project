import React from "react";
import styles from "./MoveCardMenu.module.css";

function MoveCardMenu({ currentColumnId, columns, onMove }) {
  return (
    <div className={styles.menu}>
      <h4>Select Target Column</h4>
      <ul>
        {Object.entries(columns)
          .filter(([columnId]) => columnId !== currentColumnId) // Exclude coloana curentă
          .map(([columnId, columnCards]) => (
            <li key={columnId}>
              <button onClick={() => onMove(columnId)}>
                Column {columnId}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MoveCardMenu;
