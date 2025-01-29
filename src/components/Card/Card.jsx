import React, { useState } from "react";
import styles from "./Card.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import { useSelector } from "react-redux";
import { selectColumns } from "../../redux/column/selectors";

function Card({ card, onEdit, onDelete, onMove }) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const columns = useSelector(selectColumns);

  // Generează clasa pentru bulina de prioritate
  const priorityClass = `${styles.priorityCircle} ${
    styles[card.cardPriority.toLowerCase()] || styles.default
  }`;

  const handleMove = (toColumnId) => {
    onMove(card, toColumnId);
    setShowMoveMenu(false); // Închide meniul după mutare
  };

  return (
    <div
      className={`${styles.cardContainer} ${
        styles[`${card.cardPriority.toLowerCase()}Priority`] || ""
      }`}
    >
      <div className={styles.detailsContainer}>
        <h4 className={styles.title}>{card.cardName}</h4>
        <p className={styles.text}>{card.cardDescription}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.secondContainer}>
          <div className={styles.priority}>
            <p className={styles.smallText}>Priority:</p>
            <div className={styles.priorityStatus}>
              <div className={priorityClass}></div>
              <span className={styles.status}>{card.cardPriority}</span>
            </div>
          </div>
          <div className={styles.deadline}>
            <p className={styles.smallText}>Deadline:</p>
            <p className={styles.status}>
              {new Date(card.deadlineDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={styles.icons}>
          <Icon
            name={"move"}
            size={16}
            handlerFunction={() => setShowMoveMenu(!showMoveMenu)}
          />
          <Icon name={"edit"} size={16} handlerFunction={() => onEdit(card)} />
          <Icon
            name={"delete"}
            size={16}
            handlerFunction={() => onDelete(card)}
          />
        </div>
      </div>
      {showMoveMenu && (
        <div className={styles.moveMenu}>
          <ul className={styles.columnList}>
            {columns
              .filter((column) => column._id !== card.columnId)
              .map((column) => (
                <li key={column._id} className={styles.columnItem}>
                  <button
                    className={styles.columnButton}
                    onClick={() => handleMove(column._id)}
                  >
                    {/* Debugging: verifică datele coloanei */}
                    {column.name}
                    <Icon name={"move"} size={16} extraClass={styles.icon} />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Card;
