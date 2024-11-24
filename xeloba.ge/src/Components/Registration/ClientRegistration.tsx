import styles from "../Styles/ClientRegistration.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import GetToken from "../Datas/GetToken";
import GetData from "../Datas/GetData";
import { preventInvalidInput } from "../Hooks/PreventInvalidInput";
import { useValidationOfExistingData } from "./ValidationOfExistingData";
import useEnterKeyPress from "../Hooks/useEnterKeyPress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type ClientInputs = {
  userId: string;
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const emailValidationRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function ClientRegistration() {
  const token = GetToken();
  const getData = GetData();
  const formRef = useRef<HTMLFormElement>(null);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<ClientInputs>();
  const { validateField, isPhoneNumberValid, isEmailValid, isPersonalIdValid } =
    useValidationOfExistingData(getData);


      // Effect to check fields on autofill or direct input change
  useEffect(() => {
    const subscription = watch((values) => {
      if (values.email) {
        validateField(values.email, "email");
      }
      if (values.phoneNumber) {
        validateField(values.phoneNumber, "phone_number");
      }
      if (values.personalIdNumber) {
        validateField(values.personalIdNumber, "personalID");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, validateField]);

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldType: string
  ) => {
    validateField(e.target.value, fieldType);
  };

  const generateUserId = () => {
    return `client_${Math.floor(Math.random() * 100000000)}`;
  };

  const handleSeePassword = () => setSeePassword(!seePassword);

  useEffect(() => {
    setValue("userId", generateUserId());
  }, [setValue]);

  const onSubmit: SubmitHandler<ClientInputs> = async () => {
    if (!isPhoneNumberValid || !isEmailValid || !isPersonalIdValid) {
      return;
    }

    formRef.current?.submit();
  };

  useEnterKeyPress(handleSubmit(onSubmit));

  return (
    <div className={styles.parentContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>მომხმარებლის რეგისტრაცია</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          method="post"
          action="/reg"
          encType="multipart/form-data"
        >
          <input type="hidden" name="csrfmiddlewaretoken" value={token} />
          <input type="hidden" {...register("userId")} />

          <div className={styles.registrationForm}>
            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="firstName">სახელი</label>
              </div>

              <input
                type="text"
                id="firstName"
                className={`${styles.inputCard__input} ${
                  errors.firstName ? styles.inputCard__inputError : ""
                }`}
                {...register("firstName", {
                  required: "აუცილებელი ველი",
                  minLength: { value: 2, message: "მინიმუმ 2 ასო" },
                  pattern: {
                    value: /^[a-zA-Zა-ჰ]+$/,
                    message: "დასაშვებია მხოლოდ ასოები",
                  },
                })}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="lastName">გვარი</label>
              </div>

              <input
                type="text"
                id="lastName"
                className={`${styles.inputCard__input} ${
                  errors.lastName ? styles.inputCard__inputError : ""
                }`}
                {...register("lastName", {
                  required: "აუცილებელი ველი",
                  minLength: { value: 5, message: "მინიმუმ 5 ასო" },
                  pattern: {
                    value: /^[a-zA-Zა-ჰ]+$/,
                    message: "დასაშვებია მხოლოდ ასოები",
                  },
                })}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="personalId">პირადი ნომერი</label>
              </div>
              <input
                type="number"
                id="personalId"
                className={`${styles.inputCard__input} ${
                  errors.personalIdNumber || !isPersonalIdValid
                    ? styles.inputCard__inputError
                    : ""
                }`}
                {...register("personalIdNumber", {
                  required: "აუცილებელი ველი",
                  minLength: { value: 11, message: "ფორმატი არავალიდურია" },
                  maxLength: { value: 11, message: "ფორმატი არავალიდურია" },
                })}
                onBlur={(e) => handleBlur(e, "personalID")}
                onKeyDown={preventInvalidInput}
              />
              {errors.personalIdNumber && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.personalIdNumber.message}
                </p>
              )}
              {!isPersonalIdValid && (
                <p className={styles.inputCard__errorMessages}>
                  პირადი ნომერი უკვე არსებობს ბაზაში
                </p>
              )}
            </div>

            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="phoneNumber">ტელეფონის ნომერი</label>
              </div>
              <input
                type="number"
                id="phoneNumber"
                className={`${styles.inputCard__input} ${
                  errors.phoneNumber || !isPhoneNumberValid
                    ? styles.inputCard__inputError
                    : ""
                }`}
                {...register("phoneNumber", {
                  required: "აუცილებელი ველი",
                  minLength: { value: 9, message: "ფორმატი არავალიდურია" },
                  maxLength: { value: 9, message: "ფორმატი არავალიდურია" },
                })}
                onBlur={(e) => handleBlur(e, "phone_number")}
                onKeyDown={preventInvalidInput}
                autoComplete="tel"
              />
              {errors.phoneNumber && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.phoneNumber.message}
                </p>
              )}
              {!isPhoneNumberValid && (
                <p className={styles.inputCard__errorMessages}>
                  ნომერი უკვე არსებობს ბაზაში
                </p>
              )}
            </div>

            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="email">იმეილი</label>
              </div>
              <input
                type="text"
                id="email"
                className={`${styles.inputCard__input} ${
                  errors.email || !isEmailValid
                    ? styles.inputCard__inputError
                    : ""
                }`}
                {...register("email", {
                  required: "აუცილებელი ველი",
                  pattern: {
                    value: emailValidationRegex,
                    message: "ფორმატი არავალიდურია",
                  },
                })}
                onBlur={(e) => handleBlur(e, "email")}
                autoComplete="email"
              />
              {errors.email && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.email.message}
                </p>
              )}
              {!isEmailValid && (
                <p className={styles.inputCard__errorMessages}>
                  იმეილი უკვე არსებობს ბაზაში
                </p>
              )}
            </div>

            <div className={styles.inputCard}>
              <div className={styles.inputCard__labelBox}>
                <label htmlFor="password">პაროლი</label>
              </div>
              <div className={styles.inputCard__relative}>
                <input
                  type={seePassword ? "text" : "password"}
                  id="password"
                  className={`${styles.inputCard__input} ${
                    errors.password ? styles.inputCard__inputError : ""
                  }`}
                  {...register("password", {
                    required: "აუცილებელი ველი",
                    minLength: { value: 6, message: "მინიმუმ 6 სიმბოლო" },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
                      message: "მინიმუმ ერთი ლათინური ასო",
                    },
                  })}
                  autoComplete="new-password"
                />
                <div
                  className={styles.inputCard__eyeIconContainer}
                  onClick={handleSeePassword}
                >
                  <FontAwesomeIcon
                    icon={seePassword ? faEye : faEyeSlash}
                    className={styles.faEye}
                  />
                </div>
              </div>
              {errors.password && (
                <p className={styles.inputCard__errorMessages}>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              რეგისტრაცია
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientRegistration;
