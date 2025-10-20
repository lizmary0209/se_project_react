import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  onToggle,
  isWeatherDataLoaded,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
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

      <div className="header__right">
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
        <Link to="/profile" className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
