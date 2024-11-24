
import styles from "../Styles/Authorization.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetData from "../Datas/GetData";
import GetToken from "../Datas/GetToken";
import { preventInvalidInput } from "../Hooks/PreventInvalidInput";
import useEnterKeyPress from "../Hooks/useEnterKeyPress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function CraftsmanAuthorization() {
  const getData = GetData();
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [phoneNumberAuthorization, setPhoneNumberAuthorization] =
    useState<string>("");
  const [passwordAuthorization, setPasswordAuthorization] =
    useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Added state for "Remember Me"
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const serverBaseUrl = "https://xeloba.ge/";
  const [otp, setOtp] = useState<number | null>(null);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [enteredOtp, setEnteredOtp] = useState<string>("");

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  const [phoneNumberError, setPhoneNumberError] = useState<string>(""); // State for phone number error
  const [passwordError, setPasswordError] = useState<string>(""); // State for password error
  const [verificationError, setVerificationError] = useState<string>("");

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

  // Function to send OTP
  const sendOtp = async (userPhoneNumber: string) => {
    const verificationCode = Math.floor(Math.random() * 9000);
    const apiKey = "f5e53ecd65894293934d40e5c3bcd901k";
    const sender = "xeloba.ge";
    const message = `ვერიფიკაციის კოდი: ${verificationCode}`;

    const url = `https://smsoffice.ge/api/v2/send/?key=${apiKey}&destination=${userPhoneNumber}&sender=${sender}&content=${message}&urgent=true`;
    console.log(verificationCode);
    setOtp(verificationCode);
    setTimeLeft(120); // Reset the countdown timer when a new OTP is sent
    setIsCountingDown(true); // Start the countdown

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Success) {
        setIsOtpSent(true);
        return verificationCode;
      } else {
        console.error("Failed to send OTP:", data.Message);
        return null;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return null;
    }
  };

  // Countdown Timer Logic
  useEffect(() => {
    if (isCountingDown && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval on component unmount
    } else if (timeLeft === 0) {
      setIsOtpSent(false);
      setIsCountingDown(false);
    }
  }, [timeLeft, isCountingDown]);


  
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

    if (user) {
      if (user.status === "false") {
        sendOtp(user.phone_number);
        setIsOtpSent(true);
        setUserPhoneNumber(user.phone_number);

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
      } else {
        navigate(`/personal-page/${user.userID}`);
      }
    }
  };

  const verifyOtp = async () => {
    const user = getData.find(
      (craftsman) =>
        craftsman.phone_number === phoneNumberAuthorization &&
        craftsman.password === passwordAuthorization
    );

    if (user && parseInt(enteredOtp) === otp) {
      setVerificationError("");
      navigate(`/personal-page/${user.userID}`);

      // Update the user status to "true"
      try {
        const token = GetToken(); // Assume you are using CSRF token protection
        const response = await fetch(
          `${serverBaseUrl}craftsman/${user.userID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // If token is needed for authorization
            },
            body: JSON.stringify({
              ...user,
              status: "true",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update user status.");
        }

        console.log("User status updated to true!");
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    } else {
      setVerificationError("კოდი არასწორია");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEnterKeyPress(handleLogin);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.authorizationContainer}>
        <h2 className={styles.header}>
          {!isOtpSent ? "ხელოსნის ავტორიზაცია" : "ვერიფიკაცია"}
        </h2>
        {!isOtpSent ? (
          <div className={styles.authorization}>
            {/* Login Form */}
            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label
                  htmlFor="phoneNumber"
                  className={styles.inputCard__label}
                >
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
                {passwordError && (
                  <p className={styles.error}>{passwordError}</p>
                )}
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
        ) : (
          <div className={styles.verification}>
            {/* OTP Verification Form */}
            <div className={styles.inputCard}>
              <p className={styles.verificationInfo}>
                თქვენს ნომერზე გამოგზავნილია ერთჯერადი კოდი. გთხოვთ დაადასტუროთ
                იგი!
              </p>

              <div className={styles.resendCodeContainer}>
                <p>არ მიგიღია კოდი?</p>
                <p
                  className={styles.resendCodeContainer__resend}
                  onClick={() => sendOtp(userPhoneNumber)}
                >
                  თავიდან გაგზავნა
                </p>
              </div>

              <div className={styles.codeValidityPeriod}>
                <p>კოდის ვალიდურობის დრო:</p>
                <p
                  className={
                    timeLeft <= 20
                      ? styles.codeValidityPeriod__timerOuting
                      : styles.codeValidityPeriod__timer
                  }
                >
                  {formatTime(timeLeft)}
                </p>
              </div>

              <div className={styles.inputCard__labelBox}>
                <label
                  htmlFor="verification"
                  className={styles.inputCard__label}
                >
                  ვერიფიკაციის კოდი
                </label>
              </div>

              <input
                id="verification"
                type="number"
                value={enteredOtp}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  setVerificationError("");
                }}
                className={
                  verificationError
                    ? styles.inputCard__inputError
                    : styles.inputCard__input
                }
                onKeyDown={preventInvalidInput}
              />
              <div className={styles.inputCard__errorMessage}>
                {verificationError && (
                  <p className={styles.error}>{verificationError}</p>
                )}
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={verifyOtp}>
                ვერიფიკაცია
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CraftsmanAuthorization;








































// import styles from "../Styles/Authorization.module.scss";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import GetData from "../Datas/GetData";
// import GetToken from "../Datas/GetToken";
// import { preventInvalidInput } from "../Hooks/PreventInvalidInput";
// import useEnterKeyPress from "../Hooks/useEnterKeyPress";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// function CraftsmanAuthorization() {
//   const getData = GetData();
//   const navigate = useNavigate();
//   const [seePassword, setSeePassword] = useState<boolean>(false);
//   const [phoneNumberAuthorization, setPhoneNumberAuthorization] =
//     useState<string>("");
//   const [passwordAuthorization, setPasswordAuthorization] =
//     useState<string>("");
//   const [rememberMe, setRememberMe] = useState<boolean>(false); // Added state for "Remember Me"
//   const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
//   const serverBaseUrl = "https://xeloba.ge/";
//   const [otp, setOtp] = useState<number | null>(null);
//   const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
//   const [enteredOtp, setEnteredOtp] = useState<string>("");

//   const [timeLeft, setTimeLeft] = useState<number>(120);
//   const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

//   const [phoneNumberError, setPhoneNumberError] = useState<string>(""); // State for phone number error
//   const [passwordError, setPasswordError] = useState<string>(""); // State for password error
//   const [verificationError, setVerificationError] = useState<string>("");

//   // Retrieve stored phone number and password when the component mounts
//   useEffect(() => {
//     const storedPhoneNumber = localStorage.getItem("phoneNumber");
//     const storedPassword = localStorage.getItem("password");
//     const storedRememberMe = localStorage.getItem("rememberMe");

//     if (storedRememberMe === "true") {
//       setPhoneNumberAuthorization(storedPhoneNumber || "");
//       setPasswordAuthorization(storedPassword || "");
//       setRememberMe(true);
//     }
//   }, []);

//   // Function to send OTP
//   // const sendOtp = async (userPhoneNumber: string) => {
//   //   const verificationCode = Math.floor(Math.random() * 9000);
//   //   const apiKey = "f5e53ecd65894293934d40e5c3bcd901k";
//   //   const sender = "xeloba.ge";
//   //   const message = `ვერიფიკაციის კოდი: ${verificationCode}`;

//   //   const url = `https://smsoffice.ge/api/v2/send/?key=${apiKey}&destination=${userPhoneNumber}&sender=${sender}&content=${message}&urgent=true`;
//   //   console.log(verificationCode);
//   //   setOtp(verificationCode);
//   //   setTimeLeft(120); // Reset the countdown timer when a new OTP is sent
//   //   setIsCountingDown(true); // Start the countdown

//   //   try {
//   //     const response = await fetch(url);
//   //     const data = await response.json();
//   //     if (data.Success) {
//   //       setIsOtpSent(true);
//   //       return verificationCode;
//   //     } else {
//   //       console.error("Failed to send OTP:", data.Message);
//   //       return null;
//   //     }
//   //   } catch (error) {
//   //     console.error("Error sending OTP:", error);
//   //     return null;
//   //   }
//   // };

//   const handleOtpRequestSubmit = (e:any) => {
//     e.preventDefault();
    
//   };

//   // Countdown Timer Logic
//   useEffect(() => {
//     if (isCountingDown && timeLeft > 0) {
//       const timerId = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);

//       return () => clearInterval(timerId); // Cleanup the interval on component unmount
//     } else if (timeLeft === 0) {
//       setIsOtpSent(false);
//       setIsCountingDown(false);
//     }
//   }, [timeLeft, isCountingDown]);


  
//   const handleSeePassword = () => setSeePassword(!seePassword);

//   const handleLogin = () => {
//     // Check if phone number exists in the database
//     const userWithPhoneNumber = getData.find(
//       (craftsman) => craftsman.phone_number === phoneNumberAuthorization
//     );
  
//     // Check if password exists in the database
//     const userWithPassword = getData.find(
//       (craftsman) => craftsman.password === passwordAuthorization
//     );
  
//     // Check if a user with both the provided phone number and password exists
//     const user = getData.find(
//       (craftsman) =>
//         craftsman.phone_number === phoneNumberAuthorization &&
//         craftsman.password === passwordAuthorization
//     );
  
//     // Display appropriate error messages
//     if (!user) {
//       if (!userWithPhoneNumber) {
//         setPhoneNumberError("მომხმარებლის ნომერი არასწორია");
//       } else {
//         setPhoneNumberError("");
//       }
  
//       if (!userWithPassword) {
//         setPasswordError("მომხმარებლის პაროლი არასწორია");
//       } else {
//         setPasswordError("");
//       }
  
//       // If phone number and password exist but don't match the same user, show a mismatch error
//       if (userWithPhoneNumber && userWithPassword) {
//         setPasswordError("ტელეფონის ნომერი და პაროლი არ ემთხვევა");
//         setPhoneNumberError("");
//       }
//       return;
//     }

//     // Clear error messages when correct data is entered
//     setPhoneNumberError("");
//     setPasswordError("");

//     if (user) {
//       if (user.status === "false") {
//         // sendOtp(user.phone_number);
//         setIsOtpSent(true);
//         setUserPhoneNumber(user.phone_number);

//         // Remember Me logic
//         if (rememberMe) {
//           localStorage.setItem("phoneNumber", phoneNumberAuthorization);
//           localStorage.setItem("password", passwordAuthorization);
//           localStorage.setItem("rememberMe", "true");
//         } else {
//           localStorage.removeItem("phoneNumber");
//           localStorage.removeItem("password");
//           localStorage.removeItem("rememberMe");
//         }
//       } else {
//         navigate(`/personal-page/${user.userID}`);
//       }
//     }
//   };

//   const verifyOtp = async () => {
//     const user = getData.find(
//       (craftsman) =>
//         craftsman.phone_number === phoneNumberAuthorization &&
//         craftsman.password === passwordAuthorization
//     );

//     if (user && parseInt(enteredOtp) === otp) {
//       setVerificationError("");
//       navigate(`/personal-page/${user.userID}`);

//       // Update the user status to "true"
//       try {
//         const token = GetToken(); // Assume you are using CSRF token protection
//         const response = await fetch(
//           `${serverBaseUrl}craftsman/${user.userID}`,
//           {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // If token is needed for authorization
//             },
//             body: JSON.stringify({
//               ...user,
//               status: "true",
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to update user status.");
//         }

//         console.log("User status updated to true!");
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     } else {
//       setVerificationError("კოდი არასწორია");
//     }
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   useEnterKeyPress(handleLogin);

  

//   return (
//     <div className={styles.parentContainer}>
//       <div className={styles.authorizationContainer}>
//         <h2 className={styles.header}>
//           {!isOtpSent ? "ხელოსნის ავტორიზაცია" : "ვერიფიკაცია"}
//         </h2>
//         {!isOtpSent ? (
//           <form className={styles.authorization}
//           action="/loginone"
//           method="post"
//           encType="multipart/form-data"
//           onSubmit={handleOtpRequestSubmit}
//           >
//             {/* Login Form */}
//             <div className={styles.inputCard}>
//               <div className={styles.inputCard__labelBox}>
//                 <label
//                   htmlFor="phoneNumber"
//                   className={styles.inputCard__label}
//                 >
//                   ტელეფონის ნომერი
//                 </label>
//               </div>
//               <input
//                 type="number"
//                 name="phoneNumber"
//                 id="phoneNumber"
//                 className={
//                   phoneNumberError
//                     ? styles.inputCard__inputError
//                     : styles.inputCard__input
//                 }
//                 value={phoneNumberAuthorization} // Pre-fill the input with stored value
//                 onChange={(e) => {
//                   setPhoneNumberAuthorization(e.target.value);
//                   setPhoneNumberError(""); // Clear error when the user types
//                 }}
//                 onKeyDown={preventInvalidInput}
//               />
//               <div className={styles.inputCard__errorMessage}>
//                 {phoneNumberError && (
//                   <p className={styles.error}>{phoneNumberError}</p>
//                 )}
//               </div>
//             </div>

//             <div className={styles.inputCard}>
//               <div className={styles.inputCard__labelBox}>
//                 <label htmlFor="password" className={styles.inputCard__label}>
//                   პაროლი
//                 </label>
//               </div>

//               <div className={styles.inputCard__relativeBox}>
//                 <input
//                   type={seePassword ? "text" : "password"}
//                   name="password"
//                   id="password"
//                   className={
//                     passwordError
//                       ? styles.inputCard__inputError
//                       : styles.inputCard__input
//                   }
//                   value={passwordAuthorization} // Pre-fill the input with stored value
//                   onChange={(e) => {
//                     setPasswordAuthorization(e.target.value);
//                     setPasswordError(""); // Clear error when the user types
//                   }}
//                 />

//                 <FontAwesomeIcon
//                   icon={seePassword ? faEye : faEyeSlash}
//                   className={styles.faEye}
//                   onClick={handleSeePassword}
//                 />
//               </div>
//               <div className={styles.inputCard__errorMessage}>
//                 {passwordError && (
//                   <p className={styles.error}>{passwordError}</p>
//                 )}
//               </div>
//             </div>

//             {/* "Remember Me" Checkbox */}
//             <div className={styles.checkboxContainer}>
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               <div className={styles.checkboxContainer__label}>
//                 <label htmlFor="rememberMe">დამიმახსოვრე</label>
//               </div>
//             </div>

//             <div className={styles.buttonContainer}>
//               <button className={styles.button} onClick={handleLogin}>
//                 ავტორიზაცია
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className={styles.verification}>
//             {/* OTP Verification Form */}
//             <div className={styles.inputCard}>
//               <p className={styles.verificationInfo}>
//                 თქვენს ნომერზე გამოგზავნილია ერთჯერადი კოდი. გთხოვთ დაადასტუროთ
//                 იგი!
//               </p>

//               <div className={styles.resendCodeContainer}>
//                 <p>არ მიგიღია კოდი?</p>
//                 <p
//                   className={styles.resendCodeContainer__resend}
//                   // onClick={() => sendOtp(userPhoneNumber)}
//                 >
//                   თავიდან გაგზავნა
//                 </p>
//               </div>

//               <div className={styles.codeValidityPeriod}>
//                 <p>კოდის ვალიდურობის დრო:</p>
//                 <p
//                   className={
//                     timeLeft <= 20
//                       ? styles.codeValidityPeriod__timerOuting
//                       : styles.codeValidityPeriod__timer
//                   }
//                 >
//                   {formatTime(timeLeft)}
//                 </p>
//               </div>

//               <div className={styles.inputCard__labelBox}>
//                 <label
//                   htmlFor="verification"
//                   className={styles.inputCard__label}
//                 >
//                   ვერიფიკაციის კოდი
//                 </label>
//               </div>

//               <input
//                 id="verification"
//                 type="number"
//                 value={enteredOtp}
//                 onChange={(e) => {
//                   setEnteredOtp(e.target.value);
//                   setVerificationError("");
//                 }}
//                 className={
//                   verificationError
//                     ? styles.inputCard__inputError
//                     : styles.inputCard__input
//                 }
//                 onKeyDown={preventInvalidInput}
//               />
//               <div className={styles.inputCard__errorMessage}>
//                 {verificationError && (
//                   <p className={styles.error}>{verificationError}</p>
//                 )}
//               </div>
//             </div>

//             <div className={styles.buttonContainer}>
//               <button className={styles.button} onClick={verifyOtp}>
//                 ვერიფიკაცია
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CraftsmanAuthorization;
