import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ ...values }, resetForm);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={isOpen}
      onClose={onCloseModal}
      name="add-garment"
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Image URL:
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <label>
        weather:
        <input
          type="text"
          name="weather"
          value={values.weather}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
