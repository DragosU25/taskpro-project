import React from "react";
import { useTheme } from "../../utils/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    toggleTheme(newTheme);
  };

  return (
    <select
      id="theme"
      value={theme}
      onChange={handleThemeChange}
      className={styles.select}
      aria-label="theme selector"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="violet">Violet</option>
    </select>
  );
};

export default ThemeSwitcher;
