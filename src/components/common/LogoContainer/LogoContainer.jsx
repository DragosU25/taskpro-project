import React from "react";
import styles from "./LogoContainer.module.css";
import Icon from "../SvgIcon/SvgIcon";

function LogoContainer({ font, extraClass }) {
  return (
    <div className={`${styles.logoContainer} ${extraClass}`}>
      <Icon name={"logo"} size={32} extraClass={styles.logoIcon} />

      <span className={styles.appName} style={{ fontSize: font }}>
        Task Pro
      </span>
    </div>
  );
}

export default LogoContainer;
