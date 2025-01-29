import React from "react";
import Card from "../Card/Card";
import styles from "./CardsList.module.css";

function CardList({ cards, onEdit, onDelete, onMove }) {
  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onEdit={() => onEdit(card)}
          onDelete={() => onDelete(card._id)}
          onMove={(card, toColumnId) => onMove(card, toColumnId)} // Include card ID
        />
      ))}
    </div>
  );
}

export default CardList;
