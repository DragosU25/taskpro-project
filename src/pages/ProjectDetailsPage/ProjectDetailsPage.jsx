import { useParams } from "react-router-dom";

function ProjectDetailsPage() {
  const { id } = useParams();

  return <div>ProjectDetailsPage for {id}</div>;
}

export default ProjectDetailsPage;
