import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  onToggle,
  isWeatherDataLoaded,
  username = "Terrence Tegegne",
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__info">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </NavLink>
        <p className="header__date-and-location">
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

        <NavLink to="/profile" className="header__profile">
          <span className="header__user-name">{username}</span>
          <img src={avatar} alt="user avatar" className="header__avatar" />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
