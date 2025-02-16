import React, { useState } from "react";
import Button from "../common/Button/Button";
import InputField from "../common/InputField/InputField";
import styles from "./CardForm.module.css";
import DatePicker from "react-datepicker";

import { HiChevronDown } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../common/SvgIcon/SvgIcon";

const CardForm = ({ columnId, handleClose, onSubmit, card }) => {
  const [cardData, setCardData] = useState({
    cardName: card?.cardName || "",
    cardDescription: card?.cardDescription || "",
    cardPriority: card?.cardPriority || "Low",
    deadlineDate: card?.cardDeadline || "",
  });

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const getFormattedDate = () => {
    if (!cardData.deadlineDate) {
      return (
        "Today, " +
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      );
    }
    return new Date(cardData.deadlineDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };
  const handleChangeDate = (date) => {
    setCardData((prevState) => ({
      ...prevState,
      deadlineDate: date,
    }));
    setIsCalendarVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriorityChange = (priority) => {
    setCardData((prevState) => ({
      ...prevState,
      cardPriority: priority,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit(cardData);
    handleClose();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>{card ? "Edit Card" : "Add Card"}</h2>

      <InputField
        type="text"
        name={"cardName"}
        placeholder={"Title"}
        value={cardData.cardName}
        handleChange={handleChange}
        required
      />

      <textarea
        className={styles.textarea}
        name="cardDescription"
        placeholder="Description"
        value={cardData.cardDescription}
        onChange={handleChange}
        required
      ></textarea>

      <div className={styles.priorityContainer}>
        <label className={styles.label}>Label color</label>
        <div className={styles.priorityOptions}>
          <div
            className={`${styles.priorityBubble} ${styles.low} ${
              cardData.cardPriority === "Low" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityChange("Low")}
          ></div>
          <div
            className={`${styles.priorityBubble} ${styles.medium} ${
              cardData.cardPriority === "Medium" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityChange("Medium")}
          ></div>
          <div
            className={`${styles.priorityBubble} ${styles.high} ${
              cardData.cardPriority === "High" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityChange("High")}
          ></div>
          <div
            className={`${styles.priorityBubble} ${styles.without} ${
              cardData.cardPriority === "Without" ? styles.selected : ""
            }`}
            onClick={() => handlePriorityChange("Without")}
          ></div>
        </div>
      </div>
      <div className={styles.deadlineContainer}>
        <label className={styles.label}>Deadline</label>
        <div className={styles.dateContainer}>
          <input
            type="text"
            value={getFormattedDate()}
            readOnly
            className={styles.dateInput}
          />
          <div style={{ position: "relative" }}>
            {" "}
            <HiChevronDown
              className={styles.arrowIcon}
              onClick={() => setIsCalendarVisible(true)}
            />
            {isCalendarVisible && (
              <div className="datePickerContainer">
                {" "}
                <DatePicker
                  selected={
                    cardData.deadlineDate
                      ? new Date(cardData.deadlineDate)
                      : new Date()
                  }
                  onChange={handleChangeDate}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className={styles.reactDatePicker}
                  todayButton="Today"
                  inline
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" extraClass={styles.button}>
          <div className={styles.iconContainer}>
            <Icon
              name={card ? "edit" : "plus"}
              size={14}
              extraClass={styles.icon}
            />
          </div>
          {card ? "Edit" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default CardForm;
