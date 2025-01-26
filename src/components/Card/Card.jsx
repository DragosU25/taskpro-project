import React from "react";
import styles from "./Card.module.css";
import Icon from "../common/SvgIcon/SvgIcon";

function Card({ card, onEdit, onDelete, onMove }) {
  // Generează clasa pentru bulina de prioritate
  const priorityClass = `${styles.priorityCircle} ${
    styles[card.cardPriority.toLowerCase()] || styles.default
  }`;

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
          <Icon name={"move"} size={16} handlerFunction={() => onMove(card)} />
          <Icon name={"edit"} size={16} handlerFunction={() => onEdit(card)} />
          <Icon
            name={"delete"}
            size={16}
            handlerFunction={() => onDelete(card)}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
