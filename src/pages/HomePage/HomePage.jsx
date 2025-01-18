import React from "react";
import styles from "./HomePage.module.css";
import { homeImg } from "../../utils";
import { Link, Outlet } from "react-router-dom";
import LogoContainer from "../../components/common/LogoContainer/LogoContainer";

function HomePage() {
  return (
    <div className={styles.container}>
      <img src={homeImg} alt="computer" className={styles.homeImg} />
      <LogoContainer font={40} />
      <p className={styles.text}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>

      <div className={styles.buttonsContainer}>
        <Link to={"/register"} className={styles.registerButton}>
          Registration
        </Link>
        <Link to={"/login"} className={styles.loginButton}>
          Log in
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
