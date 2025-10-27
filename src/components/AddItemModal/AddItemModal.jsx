import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useMemo, useEffect } from "react";

const defaultValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    showErrors,
    setShowErrors,
    validateAllFields,
  } = useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setShowErrors(false);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setShowErrors(true);
    validateAllFields();  // This will update isValid state
  }
    function handleSubmit(evt) {
      evt.preventDefault();
      const isFormValid = validateAllFields();
      if (isFormValid) {
        onAddItem(values, resetForm);
      }
    }
  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onCloseModal();
      }}
      onSubmit={handleSubmit}
      isDisabled={showErrors && !isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((w) => (
          <label
            key={w}
            htmlFor={w}
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id={w}
              name="weather"
              value={w}
              checked={values.weather === w}
              onChange={handleChange}
              className="modal__radio-input"
            />
            {w.charAt(0).toUpperCase() + w.slice(1)}
          </label>
        ))}

        <span className="modal__error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
