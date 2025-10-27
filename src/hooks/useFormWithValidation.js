import { useState, useEffect } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);  // Start as true
  const [showErrors, setShowErrors] = useState(false);

  const validateField = (name, value) => {
    let errorMessage = "";
    if (!value || value.trim() === "") {
      switch (name) {
        case "name":
          errorMessage = "Name is required";
          break;
        case "imageUrl":
          errorMessage = "Image URL is required";
          break;
        case "weather":
          errorMessage = "Please select a weather type";
          break;
        default:
          errorMessage = "This field is required";
      }
    } else if (name === "imageUrl" && !/^https?:\/\/.+/.test(value)) {
      errorMessage = "Enter a valid URL";
    } else if (
      name === "name" &&
      (value.length < 2 || value.length > 30)
    ) {
      errorMessage = "Name must be 2–30 characters";
    }
    return errorMessage;
  };

  function validateAllFields() {
    const newErrors = {};
    let hasErrors = false;

    // Check all fields for errors
    Object.keys(defaultValues).forEach((name) => {
      const value = values[name] || "";
      const error = validateField(name, value);
      if (error) {
        hasErrors = true;
      }
      newErrors[name] = error;
    });

    setErrors(newErrors);
    setIsValid(!hasErrors);

    // If there are no errors and we have all required values, submit the form
    if (!hasErrors) {
      return true;
    }
    return false;
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      // Validate immediately when a field changes
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
      
      // Check if all fields are filled and valid
      const allErrors = { ...errors, [name]: errorMessage };
      const noErrors = Object.values(allErrors).every((e) => !e);
      const allFilled = Object.values(newValues).every((v) => v !== "");
      setIsValid(noErrors && allFilled);
      
      return newValues;
    });
  }

  function resetForm(newValues = defaultValues) {
    setValues(newValues);
    setErrors({});
    setIsValid(true);  // Reset to true
    setShowErrors(false);
  }

  return {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    showErrors,
    setShowErrors,
    validateAllFields,
  };
}
