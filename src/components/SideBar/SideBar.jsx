import React, { forwardRef } from "react";
import styles from "./SideBar.module.css";

// Utilizăm forwardRef pentru a permite `ref` să fie atașat la această componentă
const SideBar = forwardRef(({ isSidebarOpen }, ref) => {
  return (
    <aside
      ref={ref}
      className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
    >
      <nav>
        <ul>
          <li>
            <a href="/dashboard/home">Home</a>
          </li>
          <li>
            <a href="/dashboard/profile">Profile</a>
          </li>
          <li>
            <a href="/dashboard/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
});

export default SideBar;
