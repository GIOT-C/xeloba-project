import { useState } from "react";

export const useValidationOfExistingData = (getData: any[]) => {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPersonalIdValid, setIsPersonalIdValid] = useState<boolean>(true);

  // Function to validate the existence of a value for a given field
  const validateField = (inputValue: string, fieldType: string) => {
    const exists = getData.some((data) => {
      if (fieldType === "email") {
        return data.email.toLowerCase() === inputValue.toLowerCase(); // Case-insensitive email comparison
      }
      return data[fieldType] === inputValue;
    });

    switch (fieldType) {
      case "phone_number":
        setIsPhoneNumberValid(!exists);
        break;
      case "email":
        setIsEmailValid(!exists);
        break;
      case "personalID":
        setIsPersonalIdValid(!exists);
        break;
    }
  };

  return {
    validateField,
    isPhoneNumberValid,
    isEmailValid,
    isPersonalIdValid,
  };
};
