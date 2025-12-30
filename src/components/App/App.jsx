import { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import { signup, signin, checkToken } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token) {
      openLoginModal();
      return;
    }
    setActiveModal("add-garment");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  const openEditProfileModal = () => setIsEditProfileModalOpen(true);

  const closeAllModals = useCallback(() => {
    setActiveModal("");
    setIsConfirmModalOpen(false);
    setCardToDelete(null);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileModalOpen(false);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token) {
      openLoginModal();
      return;
    }

    addItem(inputValues, token)
      .then((item) => {
        setClothingItems((prev) => [item, ...prev]);
        closeAllModals();
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

    const token = localStorage.getItem("jwt");
    if (!token) {
      openLoginModal();
      return;
    }
    const itemId = cardToDelete._id || cardToDelete.id;

    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => (item._id || item.id) !== itemId)
        );
      })
      .catch(console.error)
      .finally(() => {
        closeAllModals();
      });
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        if (!res.token) {
          return Promise.reject(new Error("No token returned from server"));
        }

        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeAllModals();

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        return user;
      })
      .catch((err) => {
        console.error("Login failed:", err);
        return Promise.reject(err);
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((res) => {
        if (!res.token) {
          return Promise.reject(new Error("No token returned from server"));
        }
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeAllModals();
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        return user;
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        return Promise.reject(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    return updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const switchToLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const switchToRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  useEffect(() => {
    const isAnyModalOpen =
      Boolean(activeModal) ||
      isConfirmModalOpen ||
      isRegisterModalOpen ||
      isLoginModalOpen ||
      isEditProfileModalOpen;

    if (!isAnyModalOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeAllModals();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [
    activeModal,
    isConfirmModalOpen,
    isRegisterModalOpen,
    isLoginModalOpen,
    isEditProfileModalOpen,
    closeAllModals,
  ]);

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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
            onToggle={handleToggleSwitchChange}
            isWeatherDataLoaded={isWeatherDataLoaded}
            isLoggedIn={isLoggedIn}
            openRegisterModal={openRegisterModal}
            openLoginModal={openLoginModal}
          />

          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isWeatherDataLoaded={isWeatherDataLoaded}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onEditProfile={openEditProfileModal}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onCloseModal={closeAllModals}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeAllModals}
            onDeleteCard={handleCardDelete}
            openConfirmationModal={openConfirmationModal}
          />

          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onConfirm={handleCardDelete}
            onCancel={closeAllModals}
          />

          {isRegisterModalOpen && (
            <RegisterModal
              onClose={closeAllModals}
              onRegister={handleRegister}
              onLogInClick={switchToLoginModal}
            />
          )}

          {isLoginModalOpen && (
            <LoginModal
              onClose={closeAllModals}
              onLogin={handleLogin}
              onSignUpClick={switchToRegisterModal}
            />
          )}

          {isEditProfileModalOpen && (
            <EditProfileModal
              onClose={closeAllModals}
              onUpdateUser={handleUpdateUser}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
