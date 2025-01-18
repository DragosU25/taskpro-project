import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "../redux/auth/selectors";

export const PrivateRoute = ({ component: Component, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? Component : <Navigate to={redirectTo} />;
};
