import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import styles from "./DashboardSharedLayout.module.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const DashboardSharedLayout = () => {
  const theme = useSelector(selectTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar(); // Închide sidebar-ul dacă s-a făcut click în afară
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark", "violet");
    if (theme) {
      document.body.classList.add(theme);
    }
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <div className={`${styles.dashboardContainer} ${theme}`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className={styles.contentWrapper}>
        {/* Trebuie să trecem `ref` pentru Sidebar */}
        <SideBar ref={sidebarRef} isSidebarOpen={isSidebarOpen} />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardSharedLayout;
