import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProjectsContainer.module.css";
import Icon from "../common/SvgIcon/SvgIcon";

function ProjectsContainer({ projects, onEdit, onDelete }) {
  return (
    <>
      <div className={styles.container}>
        {Array.isArray(projects) &&
          projects.map((project, index) => (
            <NavLink
              to={`projects/${project._id}`}
              key={index}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <div className={`${styles.projectCard}`}>
                <div className={styles.projectInfoContainer}>
                  <div>
                    <Icon
                      name={project.icon}
                      size={18}
                      extraClass={styles.icon}
                    />
                  </div>
                  <h3 className={styles.name}>{project.name}</h3>
                </div>
                <div className={styles.actionsContainer}>
                  <Icon
                    name={"edit"}
                    size={16}
                    handlerFunction={() => onEdit(project)}
                    extraClass={styles.icon}
                  />
                  <Icon
                    name={"delete"}
                    size={16}
                    handlerFunction={() => onDelete(project._id)}
                    extraClass={styles.icon}
                  />
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </>
  );
}

export default ProjectsContainer;
