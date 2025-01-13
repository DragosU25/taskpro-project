import React from "react";
import FormContainer from "../../components/common/FormContainer/FormContainer";
import { Link } from "react-router-dom";
import styles from "./InfoPage.module.css";
import LogoContainer from "../../components/common/LogoContainer/LogoContainer";

function InfoPage() {
  return (
    <FormContainer>
      <div className={styles.container}>
        <LogoContainer />
        <h2>Registration Successful!</h2>
        <p className={styles.text}>
          Please check your email to confirm your account.
        </p>
        <p className={styles.text}>
          If you didn't receive the email,
          <Link to="/resend-verification-email" className={styles.confirmLink}>
            {" "}
            click here{" "}
          </Link>
          to resend it
        </p>
        <Link to="/login" className={styles.link}>
          {" "}
          Go to Login
        </Link>
      </div>
    </FormContainer>
  );
}

export default InfoPage;
