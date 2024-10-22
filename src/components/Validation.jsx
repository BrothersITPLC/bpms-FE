import React from "react";

const Validation = ({ value, touched, validationType }) => {
  let errorMessage = "";

  // Define validation rules based on type
  const validationRules = {
    numberOnly: /^\d+$/, // Numbers only
    letterOnly: /^[A-Za-z]+$/, // Letters only
    letterAndNumber: /^[A-Za-z0-9]+$/, // Letters and numbers only
    letterAndSymbol: /^[A-Za-z!@#$%^&*()_+=-]+$/, // Letters and symbols only
    symbolAndNumber: /^[0-9!@#$%^&*()_+=-]+$/, // Symbols and numbers only
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, // Basic email format validation
    passwordComplex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, // Capital, small letters, numbers, symbols
    nonEmpty: /.+/, // Non-empty validation
    money: /^\d+(\.\d{1,2})?$/, // Money validation: digits with optional 2 decimal points
  };

  // Only show errors if the field has been touched
  if (touched) {
    if (!value) {
      errorMessage = "This field is required";
    } else if (
      validationType &&
      validationRules[validationType] &&
      !validationRules[validationType].test(value)
    ) {
      // Validation fails if regex test does not pass
      switch (validationType) {
        case "numberOnly":
          errorMessage = "Only numbers are allowed";
          break;
        case "letterOnly":
          errorMessage = "Only letters are allowed";
          break;
        case "letterAndNumber":
          errorMessage = "Only letters and numbers are allowed";
          break;
        case "letterAndSymbol":
          errorMessage = "Only letters and symbols are allowed";
          break;
        case "symbolAndNumber":
          errorMessage = "Only symbols and numbers are allowed";
          break;
        case "email":
          errorMessage = "Please enter a valid email address";
          break;
        case "passwordComplex":
          errorMessage =
            "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols";
          break;
        case "nonEmpty":
          errorMessage = "This field cannot be empty";
          break;
        case "money":
          errorMessage = "Please enter a valid amount (e.g., 123 or 123.45)";
          break;
        default:
          errorMessage = "Invalid format";
      }
    }
  }

  return <div className="text-red-500 text-sm h-5">{errorMessage}</div>;
};

export default Validation;
