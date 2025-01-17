import React, { useState } from "react";
import FormContainer from "../../components/common/FormContainer/FormContainer";
import AuthLinks from "../../components/common/AuthLinks/AuthLinks";
import InputField from "../../components/common/InputField/InputField";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Button from "../../components/common/Button/Button";
import styles from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/operators";
import Notiflix from "notiflix";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
    if (!userData.email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!userData.password.trim()) {
      setError("Password is required.");
      return false;
    }
    setError(""); // Clear errors if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const action = await dispatch(loginUser(userData)).unwrap();
      Notiflix.Notify.success("Login successful!");
      navigate("/dashboard"); // Redirecționare către dashboard
      return action;
    } catch (error) {
      Notiflix.Notify.failure(
        "Login failed. Please check your credentials and try again."
      );
      setError("Invalid email or password."); // Afișează eroarea sub formular
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <AuthLinks />
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <InputField
          type="email"
          placeholder="Enter your email"
          name="email"
          value={userData.email}
          handleChange={handleChange}
        />
        <PasswordInput
          placeholder="Enter your password"
          name="password"
          value={userData.password}
          handleChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In Now"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
