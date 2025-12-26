import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./App.css";
import { apiKey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const onAddItem = (inputValues, resetForm) => {
    addItem(inputValues)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Add item failed:", err);
      });
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;

    deleteItem(cardToDelete.id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item.id !== cardToDelete.id)
        );
      })
      .catch(console.error)
      .finally(() => {
        setCardToDelete(null);
        setIsConfirmModalOpen(false);
        setActiveModal("");
      });
  };

  const handleCancelDelete = () => {
    setCardToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = (data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
  };

  const switchToLoginModal = () => {
    closeRegisterModal();
    openLoginModal();
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    const fallbackCoords = { latitude: 41.66753, longitude: -72.78344 };

    const handleWeatherResponse = (data) => {
      const filteredData = filterWeatherData(data);
      const tempF = filteredData.temp.F;
      const tempC = Math.round(((tempF - 32) * 5) / 9);
      setWeatherData({
        ...filteredData,
        temp: { F: tempF, C: tempC },
      });
      setIsWeatherDataLoaded(true);
    };

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          getWeather(coords, apiKey)
            .then(handleWeatherResponse)
            .catch((err) => {
              console.error("getWeather failed using geolocation coords:", err);
              // fallback
              getWeather(fallbackCoords, apiKey)
                .then(handleWeatherResponse)
                .catch(console.error);
            });
        },
        (err) => {
          console.warn(
            "Geolocation permission denied or unavailable, using fallback coords",
            err
          );
          getWeather(fallbackCoords, apiKey)
            .then(handleWeatherResponse)
            .catch(console.error);
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    } else {
      getWeather(fallbackCoords, apiKey)
        .then(handleWeatherResponse)
        .catch(console.error);
    }

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
            onToggle={handleToggleSwitchChange}
            isWeatherDataLoaded={isWeatherDataLoaded}
            openRegisterModal={openRegisterModal}
            openLoginModal={openLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isWeatherDataLoaded={isWeatherDataLoaded}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
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

        {isRegisterModalOpen && (
          <RegisterModal
            onClose={closeRegisterModal}
            onRegister={(data) => {
              console.log("User registered:", data);
              closeRegisterModal();
            }}
            onLogInClick={switchToLoginModal}
          />
        )}

        {isLoginModalOpen && (
          <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
