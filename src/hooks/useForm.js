import { useState, useEffect } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;

    const newValue = type === "checkbox" ? checked : value;

    setValues((prev) => ({ ...prev, [name]: newValue }));

    let errorMessage = "";
    if (!newValue) {
      errorMessage = "This field is required";
    } else if (name === "imageUrl" && !/^https?:\/\/.+/.test(newValue)) {
      errorMessage = "Enter a valid URL";
    } else if (
      name === "name" &&
      (newValue.length < 1 || newValue.length > 30)
    ) {
      errorMessage = "Name must be 1–30 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  }

  useEffect(() => {
    const noErrors = Object.values(errors).every((e) => !e);
    const allFilled = Object.values(values).every((v) => v !== "");
    setIsValid(noErrors && allFilled);
  }, [values, errors]);

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }

  return { values, handleChange, resetForm, errors, isValid };
}
