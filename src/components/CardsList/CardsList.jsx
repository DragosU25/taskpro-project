import React from "react";
import Card from "../Card/Card";
import styles from "./CardsList.module.css";

function CardList({ cards, onEdit, onDelete, onMove }) {
  return (
    <>
      <div className={styles.container}>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onEdit={() => onEdit(card)}
            onDelete={() => onDelete(card._id)}
            onMove={onMove}
          />
        ))}
      </div>
    </>
  );
}

export default CardList;
