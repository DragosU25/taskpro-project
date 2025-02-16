import React, { useState, useEffect } from "react";
import styles from "./EditBoardForm.module.css";
import Button from "../common/Button/Button";
import Icon from "../common/SvgIcon/SvgIcon";
import InputField from "../common/InputField/InputField";
import { backgrounds } from "../../utils";
import { useDispatch } from "react-redux";
import { editProject } from "../../redux/project/operators";

const EditBoardForm = ({ project, onClose }) => {
  const dispatch = useDispatch();

  const [selectedIcon, setSelectedIcon] = useState(project.icon);
  const [selectedBackground, setSelectedBackground] = useState(
    backgrounds.find((bg) => bg.includes(project.background)) || null
  );
  const [formData, setFormData] = useState({
    name: project.name || "",
    icon: project.icon || "",
    background: project.background || "",
  });

  useEffect(() => {
    setFormData({
      name: project.name || "",
      icon: project.icon || "",
      background: project.background || "",
    });
    setSelectedIcon(project.icon);
    setSelectedBackground(
      backgrounds.find((bg) => bg.includes(project.background)) || null
    );
  }, [project]);

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
      const formattedBackground = `bg${
        backgrounds.indexOf(selectedBackground) + 1
      }`;

      await dispatch(
        editProject({
          id: project._id,
          data: {
            name: formData.name,
            icon: selectedIcon,
            background: formattedBackground,
          },
        })
      );

      alert("Project updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Edit Project</h2>

      <InputField
        type="text"
        name="name"
        placeholder="Title"
        value={formData.name}
        handleChange={handleChange}
      />

      <div className={styles.icons}>
        <label className={styles.label}>Icons</label>
        <div className={styles.iconGrid}>
          {icons.map((icon) => (
            <div
              key={icon}
              className={`${styles.icon} ${
                selectedIcon === icon ? styles.selected : ""
              }`}
              onClick={() => setSelectedIcon(icon)}
            >
              <Icon name={icon} size={24} color="#fff" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.backgrounds}>
        <label className={styles.label}>Background</label>
        <div className={styles.backgroundGrid}>
          {backgrounds.map((bg, index) => (
            <div
              key={index}
              className={`${styles.background} ${
                selectedBackground === bg ? styles.selected : ""
              }`}
              onClick={() => setSelectedBackground(bg)}
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

      <div className={styles.buttons}>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default EditBoardForm;
