import React from "react";
import svgIcons from "../../../assets/images/sprite.svg";

import styles from "./SvgIcon.module.css";

const Icon = ({ name, color, size, handlerFunction, extraClass }) => {
  return (
    <svg
      className={`${styles.icon} ${extraClass}`}
      fill={color}
      width={size}
      height={size}
      onClick={handlerFunction}
    >
      <use href={`${svgIcons}#icon-${name}`} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 30,
  color: "black",
};

export default Icon;
