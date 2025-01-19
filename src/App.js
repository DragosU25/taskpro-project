import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeSharedLayout from "./components/HomeSharedLayout/HomeSharedLayout";
import DashboardSharedLayout from "./components/DashboardSharedLayout/DashboardSharedLayout";
import { PrivateRoute } from "./Routes/privateRoute";
import { RestrictedRoute } from "./Routes/restrictedRoute";
import ResendVerificationEmail from "./pages/ResendVerificationEmail.jsx/ResendVerificationEmail";
import { ThemeProvider } from "./utils/ThemeContext";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/auth/operators";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const InfoPage = lazy(() => import("./pages/InfoPage/InfoPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const ProjectDetailsPage = lazy(() =>
  import("./pages/ProjectDetailsPage/ProjectDetailsPage")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Rutele cu HomeSharedLayout */}
        <Route path="/" element={<HomeSharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/dashboard"
              />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/dashboard"
              />
            }
          />
          <Route path="info" element={<InfoPage />} />
          <Route
            path="resend-verification-email"
            element={<ResendVerificationEmail />}
          />
        </Route>

        {/* Rutele cu DashboardSharedLayout */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute
              component={
                <ThemeProvider>
                  <DashboardSharedLayout />
                </ThemeProvider>
              }
              redirectTo="/login"
            />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
