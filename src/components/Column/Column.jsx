import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCard,
  deleteCard,
  editCard,
  getCards,
  moveCard,
} from "../../redux/card/operators";
import { selectCardsByColumn } from "../../redux/card/selectors";
import CardList from "../CardsList/CardsList";
import Icon from "../common/SvgIcon/SvgIcon";
import styles from "./Column.module.css";
import CardForm from "../CardForm/CardForm";
import Button from "../common/Button/Button";
import Modal from "../common/Modal/Modal";
import AddColumnForm from "../AddColumnForm/AddColumnForm";
import { deleteColumn } from "../../redux/column/operators";
import DeleteModal from "../DeleteCardModal/DeleteModal";

const Column = React.memo(({ column }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => selectCardsByColumn(state, column._id));

  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalOpen = (content) => {
    if (typeof content !== "function") {
      console.error(
        "The content passed to the modal is not a valid component."
      );
    }
    setModalContent(content);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const handleAddCard = () => {
    handleModalOpen(
      <CardForm
        columnId={column._id}
        handleClose={handleModalClose}
        onSubmit={(cardData) => {
          dispatch(addCard({ cardData, columnId: column._id }))
            .unwrap()
            .then((newCard) => {
              dispatch({
                type: "cards/columnAddedCard",
                payload: { columnId: column._id, cardId: newCard._id },
              });
            })
            .catch((error) => {
              console.error("Failed to add card:", error);
            });
        }}
      />
    );
  };

  const handleDeleteCard = (cardId) => {
    const columnId = column._id;

    handleModalOpen(
      <DeleteModal
        title="Delete Card"
        message="Are you sure you want to delete this card?"
        handleModalClose={handleModalClose}
        onConfirm={() =>
          dispatch(deleteCard({ columnId, cardId }))
            .unwrap()
            .then(() => console.log("Card deleted successfully"))
            .catch((error) => console.error("Failed to delete card:", error))
        }
      />
    );
  };

  const handleEditCard = (card) => {
    handleModalOpen(
      <CardForm
        card={card}
        columnId={column._id}
        handleClose={handleModalClose}
        onSubmit={(cardData) => {
          dispatch(
            editCard({
              updatedData: cardData,
              columnId: column._id,
              cardId: card._id,
            })
          )
            .unwrap()
            .then(() => {
              console.log("Card edited successfully");
            })
            .catch((error) => {
              console.error("Failed to edit card:", error);
            });
        }}
      />
    );
  };

  const handleEditColumn = () => {
    handleModalOpen(
      <AddColumnForm handleModalClose={handleModalClose} column={column} />
    );
  };

  const handleMoveCard = (toColumnId, card) => {
    dispatch(
      moveCard({ toColumnId, cardId: card._id, fromColumnId: card.columnId })
    )
      .unwrap()
      .then(() => console.log("✅ Card moved successfully"))
      .catch((error) => console.error("❌ Failed to move card:", error));
  };

  const handleDeleteColumn = () => {
    handleModalOpen(
      <DeleteModal
        title="Delete Column"
        message="Are you sure you want to delete this column?"
        handleModalClose={handleModalClose}
        onConfirm={() =>
          dispatch(deleteColumn(column._id))
            .unwrap()
            .then(() => console.log("Column deleted successfully"))
            .catch((error) => console.error("Failed to delete column:", error))
        }
      />
    );
  };

  useEffect(() => {
    dispatch(getCards(column._id));
  }, [dispatch, column._id]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.columnNameContainer}>
          <h3 className={styles.name}>{column.name}</h3>
          <div className={styles.iconContainer}>
            <Icon name={"edit"} size={16} handlerFunction={handleEditColumn} />
            <Icon
              name={"delete"}
              size={16}
              handlerFunction={handleDeleteColumn}
            />
          </div>
        </div>
        <CardList
          cards={cards || []}
          onEdit={handleEditCard}
          onDelete={(cardId) => {
            handleDeleteCard(cardId);
          }}
          onMove={(card, toColumnId) => handleMoveCard(toColumnId, card)}
        />

        <Button extraClass={styles.button} handlerFunction={handleAddCard}>
          <div className={styles.addIconContainer}>
            <Icon name={"plus"} size={14} extraClass={styles.icon} />
          </div>
          {cards ? (
            <p className={styles.text}>Add a new Card</p>
          ) : (
            <p className={styles.text}>Add another card</p>
          )}
        </Button>
      </div>

      <Modal
        isVisible={isModalVisible}
        handleModalClose={handleModalClose}
        extraClass={styles.modal}
      >
        {modalContent}{" "}
      </Modal>
    </>
  );
});

export default Column;
