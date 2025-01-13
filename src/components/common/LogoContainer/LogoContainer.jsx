import React from "react";
import { logoImg } from "../../../utils";
import styles from "./LogoContainer.module.css";

function LogoContainer() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoImg}>
        <img src={logoImg} alt="" />
      </div>
      <span className={styles.appName}>Task Pro</span>
    </div>
  );
}

export default LogoContainer;
