import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateTheme } from "../redux/auth/operators";
import { selectTheme } from "../redux/auth/selectors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeFromRedux = useSelector(selectTheme);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (themeFromRedux) {
      setTheme(themeFromRedux);
    }
  }, [themeFromRedux]);

  const toggleTheme = async (newTheme) => {
    try {
      const action = await dispatch(updateTheme(newTheme)).unwrap();

      if (action?.data) {
        setTheme(action.data.theme);
      }
      dispatch(getCurrentUser());
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
