import { useState, useEffect } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";
    if (!value) {
      errorMessage = "This field is required";
    } else if (name === "imageUrl" && !/^https?:\/\/.+/.test(value)) {
      errorMessage = "Enter a valid URL";
    } else if (
      name === "name" &&
      value.length > 0 &&
      (value.length < 2 || value.length > 30)
    ) {
      errorMessage = "Name must be 2–30 characters";
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
