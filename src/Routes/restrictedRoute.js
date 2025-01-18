import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/auth/selectors";

export const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to={redirectTo} /> : Component;
};
