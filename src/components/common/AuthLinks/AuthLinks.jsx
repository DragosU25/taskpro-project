import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AuthLinks.module.css";

const AuthLinks = () => {
  const location = useLocation();

  return (
    <div className={styles.linksContainer}>
      <Link
        to="/register"
        className={`${styles.link} ${
          location.pathname === "/register" ? styles.active : ""
        }`}
      >
        Register
      </Link>
      <Link
        to="/login"
        className={`${styles.link} ${
          location.pathname === "/login" ? styles.active : ""
        }`}
      >
        Login
      </Link>
    </div>
  );
};

export default AuthLinks;
