import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomeSharedLayout from "./components/HomeSharedLayout/HomeSharedLayout";
import ResendVerificationEmail from "./pages/ResendVerificationEmail.jsx/ResendVerificationEmail";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const InfoPage = lazy(() => import("./pages/InfoPage/InfoPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeSharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="info" element={<InfoPage />} />
          <Route
            path="resend-verification-email"
            element={<ResendVerificationEmail />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
