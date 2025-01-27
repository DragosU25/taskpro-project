import React from "react";
import { useParams } from "react-router-dom";
import ProjectColumns from "../../components/ProjectColumns/ProjectColumns";
import styles from "./ProjectDetailsPage.module.css";
import { useSelector } from "react-redux";
import { selectProject } from "../../redux/project/selectors";

function ProjectDetailsPage() {
  const { id } = useParams();
  const projects = useSelector((state) => selectProject(state, id));

  // Assuming that projects is an array, you want to find the project with the matching id
  const project = projects?.find((p) => p._id === id);

  // Construim ruta completă pentru fundal
  const backgroundUrl = project?.background
    ? `${process.env.PUBLIC_URL}/backgroundsImg/${project.background}.jpeg` // Assuming images are stored in public/backgrounds
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
      <h2 className={styles.title}>Project Office</h2>

      <ProjectColumns projectId={id} />
    </div>
  );
}

export default ProjectDetailsPage;
