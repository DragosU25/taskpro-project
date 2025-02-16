import React from "react";
import styles from "./HelpContainer.module.css";
import { cactus } from "../../utils";
import Icon from "../common/SvgIcon/SvgIcon";
function HelpContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <img src={cactus} alt="cactus" className={styles.img} />
        <h4 className={styles.text}>
          If you need help with <span>TaskPro</span>, check out our support
          resources or reach out to our customer support team.
        </h4>
        <div className={styles.helpContainer}>
          <Icon name={"help-circle"} size={20} />
          <span>Need help?</span>
        </div>
      </div>
    </div>
  );
}

export default HelpContainer;
