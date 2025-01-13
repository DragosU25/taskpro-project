import React, { useState } from "react";
import FormContainer from "../../components/common/FormContainer/FormContainer";
import InputField from "../../components/common/InputField/InputField";
import styles from "./ResendVerificationEmail.module.css";
import Button from "../../components/common/Button/Button";
import { useDispatch } from "react-redux";
import { resendVerificationEmail } from "../../redux/auth/operators";
import { Link } from "react-router-dom";

function ResendVerificationEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(resendVerificationEmail({ email })).unwrap();
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to resend email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Resend your verification email</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={email}
          handleChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Resend"}
        </Button>
      </form>
      {success && (
        <>
          <p className={styles.success}>
            Verification email sent successfully. Please check your inbox.
          </p>
          <Link to="/login" className={styles.link}>
            Go to Login
          </Link>
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </FormContainer>
  );
}

export default ResendVerificationEmail;
