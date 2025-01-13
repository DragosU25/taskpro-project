import React from "react";
import FormContainer from "../../components/common/FormContainer/FormContainer";
import AuthLinks from "../../components/common/AuthLinks/AuthLinks";
import InputField from "../../components/common/InputField/InputField";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Button from "../../components/common/Button/Button";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  return (
    <FormContainer>
      <AuthLinks />
      <form className={styles.form}>
        <InputField type="email" placeholder="Enter your email" />
        <PasswordInput placeholder="Enter your password" />
        <Button type="submit">Log In Now</Button>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
