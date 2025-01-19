import React, { useState } from "react";
import styles from "./AddBoardForm.module.css";
import Button from "../common/Button/Button";
import Icon from "../common/SvgIcon/SvgIcon"; // Componenta Icon
import InputField from "../common/InputField/InputField";
import { backgrounds } from "../../utils";
import { useDispatch } from "react-redux";
import { addProject, getProjects } from "../../redux/project/operators";

const AddBoardForm = () => {
  const dispatch = useDispatch();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    background: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const icons = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Title is required");
      return;
    }

    if (!selectedIcon) {
      alert("Icon is required");
      return;
    }

    if (!selectedBackground) {
      alert("Background is required");
      return;
    }

    try {
      // Map the selected background to the desired format, e.g., bg1, bg2, ...
      const formattedBackground = `bg${
        backgrounds.indexOf(selectedBackground) + 1
      }`;

      // Dispatch the form data along with selected icon and formatted background
      await dispatch(
        addProject({
          name: formData.name,
          icon: selectedIcon,
          background: formattedBackground, // Send background as bg1, bg2, ...
        })
      );

      await dispatch(getProjects());

      // Optionally reset form state
      setFormData({ name: "", icon: "", background: "" });
      setSelectedIcon(null);
      setSelectedBackground(null);

      alert("Board created successfully!");
    } catch (error) {
      console.error("Error creating board:", error);
      alert("An error occurred while creating the board. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>New board</h2>

      {/* Input for title */}
      <InputField
        type="text"
        name="name"
        placeholder="Title"
        value={formData.name}
        handleChange={handleChange}
      />

      {/* Select Icon */}
      <div className={styles.icons}>
        <label className={styles.label}>Icons</label>
        <div className={styles.iconGrid}>
          {icons.map((icon) => (
            <div
              key={icon}
              className={`${styles.icon} ${
                selectedIcon === icon ? styles.selected : ""
              }`}
              onClick={() => setSelectedIcon(icon)} // Set icon when clicked
            >
              <Icon name={icon} size={24} color="#fff" />
            </div>
          ))}
        </div>
      </div>

      {/* Select Background */}
      <div className={styles.backgrounds}>
        <label className={styles.label}>Background</label>
        <div className={styles.backgroundGrid}>
          {backgrounds.map((bg, index) => (
            <div
              key={index}
              className={`${styles.background} ${
                selectedBackground === bg ? styles.selected : ""
              }`}
              onClick={() => setSelectedBackground(bg)} // Set background when clicked
            >
              <img
                src={bg}
                alt={`Background ${index + 1}`}
                className={styles.backgroundImage}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className={styles.buttons}>
        <Button type="submit">+ Create</Button>
      </div>
    </form>
  );
};

export default AddBoardForm;
