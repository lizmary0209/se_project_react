import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItem = (itemData, resetForm) => {
    setClothingItems([itemData, ...clothingItems]);
    resetForm();
    setActiveModal("");
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;

    setClothingItems(
      clothingItems.filter((item) => item.id !== cardToDelete.id)
    );
    setCardToDelete(null);
    setIsConfirmModalOpen(false);
    setActiveModal("");
  };

  const handleCancelDelete = () => {
    setCardToDelete(null);
    setIsConfirmModalOpen(false);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        const tempF = filteredData.temp.F;
        const tempC = Math.round(((tempF - 32) * 5) / 9);
        setWeatherData({
          ...filteredData,
          temp: { F: tempF, C: tempC },
        });
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Router basename="/se_project_react">
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={closeActiveModal}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteCard={handleCardDelete}
            openConfirmationModal={openConfirmationModal}
          />

          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onConfirm={handleCardDelete}
            onCancel={handleCancelDelete}
          />
          <Footer />
        </div>
      </Router>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
