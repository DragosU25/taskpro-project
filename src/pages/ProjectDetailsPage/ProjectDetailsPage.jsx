import React from "react";
import { useParams } from "react-router-dom";
import ProjectColumns from "../../components/ProjectColumns/ProjectColumns";
import styles from "./ProjectDetailsPage.module.css";
import { useSelector } from "react-redux";
import { selectProject } from "../../redux/project/selectors";

function ProjectDetailsPage() {
  const { id } = useParams();
  const projects = useSelector((state) => selectProject(state, id));

  const project = projects?.find((p) => p._id === id);

  const backgroundUrl = project?.background
    ? `${process.env.PUBLIC_URL}/backgroundsImg/${project.background}.jpeg`
    : null;

  return (
    <div
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        transition: "background 0.3s ease",
      }}
      className={styles.container}
    >
      <h2 className={styles.title}>{project?.name}</h2>

      {project ? (
        <ProjectColumns projectId={id} />
      ) : (
        <div className={styles.infoContainer}>
          <p className={styles.errorMessage}>
            Before starting your project, it is essential{" "}
            <span>to create a board </span>to visualize and track all the
            necessary tasks and milestones. This board serves as a powerful tool
            to organize the workflow and ensure effective collaboration among
            team members.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
