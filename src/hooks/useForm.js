import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, SetValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues({});
  };

  return { values, handleChange, resetForm };
}
