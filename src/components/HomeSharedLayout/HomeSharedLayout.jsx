import { Outlet } from "react-router-dom";
import styles from "./HomeSharedLayout.module.css";

function HomeSharedLayout() {
  return (
    <div className={styles.section}>
      <Outlet />
    </div>
  );
}

export default HomeSharedLayout;
