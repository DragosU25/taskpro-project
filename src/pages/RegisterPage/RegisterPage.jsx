import React, { useState } from "react";
import FormContainer from "../../components/common/FormContainer/FormContainer";
import AuthLinks from "../../components/common/AuthLinks/AuthLinks";
import InputField from "../../components/common/InputField/InputField";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Button from "../../components/common/Button/Button";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operators";
import Notiflix from "notiflix";

import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const action = await dispatch(register(userData)).unwrap();

      setUserData({
        name: "",
        email: "",
        password: "",
      });
      setError(null);

      Notiflix.Notify.success(
        "Register successful! Please check your email for confirmation!"
      );
      navigate("/info");
      console.log(action);
      return action;
    } catch (error) {
      Notiflix.Notify.failure(error.msg);
      setError(error.msg);
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <AuthLinks />
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter your name"
          id="name"
          name="name"
          value={userData.name}
          handleChange={handleChange}
          extraClass={styles.input}
        />
        <InputField
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={userData.email}
          handleChange={handleChange}
          extraClass={styles.input}
        />
        <PasswordInput
          placeholder="Create a password"
          id="password"
          name="password"
          value={userData.password}
          handleChange={handleChange}
          extraClass={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" extraClass={styles.button}>
          Register Now
        </Button>
      </form>
    </FormContainer>
  );
};

export default RegisterPage;
