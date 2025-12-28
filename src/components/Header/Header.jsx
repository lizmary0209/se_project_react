import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  onToggle,
  isWeatherDataLoaded,
  openRegisterModal,
  openLoginModal,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__info">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </NavLink>
        <p className="header__date-location">
          {currentDate}
          {isWeatherDataLoaded ? (
            <>
              , {weatherData.city} •{" "}
              {currentTemperatureUnit === "F"
                ? `${weatherData.temp.F}°F`
                : `${weatherData.temp.C}°C`}
            </>
          ) : (
            " • Loading weather..."
          )}
        </p>
      </div>

      <div className="header__controls">
        <ToggleSwitch
          isCelsius={currentTemperatureUnit === "C"}
          onToggle={onToggle}
        />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>

        {isLoggedIn ? (
          <NavLink to="/profile" className="header__profile">
            <span className="header__user-name">{currentUser?.name}</span>

            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="user avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {(currentUser?.name?.[0] || "?").toUpperCase()}
              </div>
            )}
          </NavLink>
        ) : (
          <>
            <button
              type="button"
              className="header__register-btn"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__login-btn"
              onClick={openLoginModal}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
