import { useDispatch } from "react-redux";
import Button from "../common/Button/Button";
import InputField from "../common/InputField/InputField";
import PasswordInput from "../common/PasswordInput/PasswordInput";
import Icon from "../common/SvgIcon/SvgIcon";
import styles from "./EditForm.module.css";
import {
  getCurrentUser,
  updateAvatar,
  updateUser,
} from "../../redux/auth/operators";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";

function EditForm({ avatarPath, name, email }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: name || "",
    email: email || "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateAvatar(file)).catch((error) => {
        Notiflix.Notify.failure("Failed to update avatar.");
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email) {
      Notiflix.Notify.warning("Name and email cannot be empty.");
      return;
    }

    // Trimite doar datele modificate
    const updatedUserData = {};

    if (userData.name !== name) updatedUserData.name = userData.name;
    if (userData.email !== email) updatedUserData.email = userData.email;
    if (userData.password) updatedUserData.password = userData.password;

    try {
      const action = await dispatch(updateUser(updatedUserData)).unwrap();

      // Dacă actualizarea a fost cu succes, actualizează starea formularului cu datele noi
      if (action?.data) {
        setUserData({
          name: action.data.name,
          email: action.data.email,
          password: "", // Resetăm parola după succes
        });
      }

      setError(null);
      dispatch(getCurrentUser()); // Actualizează utilizatorul curent

      return action;
    } catch (error) {
      const errorMessage =
        error.msg || "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    setUserData({ name: name || "", email: email || "", password: "" });
  }, [name, email]);

  return (
    <>
      <h2 className={styles.title}>Edit Profile</h2>
      <div className={styles.avatarContainer}>
        <img
          src={avatarPath || "/default-avatar.png"} // Folosește avatarul actualizat
          alt="User Avatar"
          className={styles.avatarImage}
        />
        <div className={styles.addContainer}>
          <input
            type="file"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
            id="avatarUpload"
          />
          <label htmlFor="avatarUpload">
            <Icon name="plus" size={10} color={"#000"} />
          </label>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter your name"
          id="name"
          name="name"
          value={userData.name}
          handleChange={handleChange}
        />
        <InputField
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={userData.email}
          handleChange={handleChange}
        />
        <PasswordInput
          placeholder="Create a password"
          id="password"
          name="password"
          value={userData.password}
          handleChange={handleChange}
          required={false}
        />
        <Button type="submit">Save Changes</Button>
        {<p className={styles.error}>{error}</p>}
      </form>
    </>
  );
}

export default EditForm;
