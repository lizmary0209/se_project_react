import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  const validateField = useCallback((name, value) => {
    if (!value || value.trim() === "") {
      if (name === "name") return "Name is required";
      if (name === "imageUrl") return "Image URL is required";
      if (name === "weather") return "Please select a weather type";
      return "This field is required";
    }

    if (name === "imageUrl" && !/^https?:\/\/.+/.test(value)) {
      return "Enter a valid URL";
    }

    if (name === "name" && (value.length < 2 || value.length > 30)) {
      return "Name must be 2–30 characters";
    }

    return "";
  }, []);

  const validateAllFields = useCallback(() => {
    const newErrors = {};
    let hasErrors = false;

    Object.keys(defaultValues).forEach((name) => {
      const value = values[name] || "";
      const error = validateField(name, value);
      newErrors[name] = error;
      if (error) hasErrors = true;
    });

    setErrors(newErrors);
    setIsValid(!hasErrors);

    return !hasErrors;
  }, [defaultValues, validateField, values]);

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;

      setValues((prevValues) => {
        const updatedValues = { ...prevValues, [name]: value };
        const errorMessage = validateField(name, value);

        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors, [name]: errorMessage };
          const noErrors = Object.values(updatedErrors).every((e) => !e);
          const allFilled = Object.values(updatedValues).every((v) => v !== "");
          setIsValid(noErrors && allFilled);
          return updatedErrors;
        });

        return updatedValues;
      });
    },
    [validateField]
  );

  const resetForm = useCallback(
    (newValues = defaultValues) => {
      setValues(newValues);
      setErrors({});
      setIsValid(true);
      setShowErrors(false);
    },
    [defaultValues]
  );

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
