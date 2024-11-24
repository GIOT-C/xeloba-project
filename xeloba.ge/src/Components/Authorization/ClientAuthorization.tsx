import styles from "../Styles/Authorization.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetData from "../Datas/GetData";
import { preventInvalidInput } from "../Hooks/PreventInvalidInput";
import useEnterKeyPress from "../Hooks/useEnterKeyPress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ClientAuthorization() {
  const getData = GetData();
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [phoneNumberAuthorization, setPhoneNumberAuthorization] =
    useState<string>("");
  const [passwordAuthorization, setPasswordAuthorization] =
    useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Added state for "Remember Me"

  const [phoneNumberError, setPhoneNumberError] = useState<string>(""); // State for phone number error
  const [passwordError, setPasswordError] = useState<string>(""); // State for password error

  // Retrieve stored phone number and password when the component mounts
  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe === "true") {
      setPhoneNumberAuthorization(storedPhoneNumber || "");
      setPasswordAuthorization(storedPassword || "");
      setRememberMe(true);
    }
  }, []);


  const handleSeePassword = () => setSeePassword(!seePassword);

  const handleLogin = () => {
    // Check if phone number exists in the database
    const userWithPhoneNumber = getData.find(
      (craftsman) => craftsman.phone_number === phoneNumberAuthorization
    );
  
    // Check if password exists in the database
    const userWithPassword = getData.find(
      (craftsman) => craftsman.password === passwordAuthorization
    );
  
    // Check if a user with both the provided phone number and password exists
    const user = getData.find(
      (craftsman) =>
        craftsman.phone_number === phoneNumberAuthorization &&
        craftsman.password === passwordAuthorization
    );
  
    // Display appropriate error messages
    if (!user) {
      if (!userWithPhoneNumber) {
        setPhoneNumberError("მომხმარებლის ნომერი არასწორია");
      } else {
        setPhoneNumberError("");
      }
  
      if (!userWithPassword) {
        setPasswordError("მომხმარებლის პაროლი არასწორია");
      } else {
        setPasswordError("");
      }
  
      // If phone number and password exist but don't match the same user, show a mismatch error
      if (userWithPhoneNumber && userWithPassword) {
        setPasswordError("ტელეფონის ნომერი და პაროლი არ ემთხვევა");
        setPhoneNumberError("");
      }
      return;
    }
  
    // Clear error messages when correct data is entered
    setPhoneNumberError("");
    setPasswordError("");
  
    // Remember Me logic
    if (rememberMe) {
      localStorage.setItem("phoneNumber", phoneNumberAuthorization);
      localStorage.setItem("password", passwordAuthorization);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  
    // Navigate to the user's personal page
    navigate(`/personal-page/${user.userID}`);
  };
 
  useEnterKeyPress(handleLogin);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.authorizationContainer}>
        <h2 className={styles.header}>მომხმარებლის ავტორიზაცია</h2>

        <div className={styles.authorization}>
          <div className={styles.inputCard}>
            <div className={styles.inputCard__labelBox}>
              <label htmlFor="phoneNumber" className={styles.inputCard__label}>
                ტელეფონის ნომერი
              </label>
            </div>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              className={
                phoneNumberError
                  ? styles.inputCard__inputError
                  : styles.inputCard__input
              }
              value={phoneNumberAuthorization} // Pre-fill the input with stored value
              onChange={(e) => {
                setPhoneNumberAuthorization(e.target.value);
                setPhoneNumberError(""); // Clear error when the user types
              }}
              onKeyDown={preventInvalidInput}
            />
            <div className={styles.inputCard__errorMessage}>
              {phoneNumberError && (
                <p className={styles.error}>{phoneNumberError}</p>
              )}
            </div>
          </div>

          <div className={styles.inputCard}>
            <div className={styles.inputCard__labelBox}>
              <label htmlFor="password" className={styles.inputCard__label}>
                პაროლი
              </label>
            </div>

            <div className={styles.inputCard__relativeBox}>
              <input
                type={seePassword ? "text" : "password"}
                name="password"
                id="password"
                className={
                  passwordError
                    ? styles.inputCard__inputError
                    : styles.inputCard__input
                }
                value={passwordAuthorization} // Pre-fill the input with stored value
                onChange={(e) => {
                  setPasswordAuthorization(e.target.value);
                  setPasswordError(""); // Clear error when the user types
                }}
              />

              <FontAwesomeIcon
                icon={seePassword ? faEye : faEyeSlash}
                className={styles.faEye}
                onClick={handleSeePassword}
              />
            </div>
            <div className={styles.inputCard__errorMessage}>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>
          </div>

          {/* "Remember Me" Checkbox */}
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <div className={styles.checkboxContainer__label}>
              <label htmlFor="rememberMe">დამიმახსოვრე</label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleLogin}>
              ავტორიზაცია
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientAuthorization;


