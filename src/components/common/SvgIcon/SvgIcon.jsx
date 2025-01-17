import React from "react";
import svgIcons from "../../../assets/images/sprite.svg";

import styles from "./SvgIcon.module.css";

const Icon = ({ name, color, size }) => {
  // Calea către fișierul sprite.svg

  return (
    <svg className={styles.icon} fill={color} width={size} height={size}>
      <use href={`${svgIcons}#icon-${name}`} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 30,
  color: "black",
};

export default Icon;
