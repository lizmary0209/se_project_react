import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  }

  function resetForm() {
    setValues(defaultValues);
  }

  return { values, handleChange, resetForm };
}
