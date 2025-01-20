import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProjectsContainer.module.css";
import Icon from "../common/SvgIcon/SvgIcon";
import { deleteProject } from "../../redux/project/operators";
import { useDispatch } from "react-redux";

function ProjectsContainer({ projects, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className={styles.container}>
      {projects?.map((project) => (
        <NavLink
          to={`projects/${project._id}`}
          key={project._id}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <div className={`${styles.projectCard}`}>
            <div className={styles.projectInfoContainer}>
              <div className={styles.icon}>
                <Icon name={project.icon} size={18} />
              </div>
              <h3 className={styles.name}>{project.name}</h3>
            </div>
            <div className={styles.actionsContainer}>
              <Icon
                name={"edit"}
                size={16}
                handlerFunction={() => onEdit(project)} // Trimite proiectul către SideBar
              />
              <Icon
                name={"delete"}
                size={16}
                handlerFunction={() => handleDelete(project._id)}
              />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default ProjectsContainer;
