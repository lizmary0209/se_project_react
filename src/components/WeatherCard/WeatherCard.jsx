import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filterOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.conditon === weatherData.conditon
    );
  });

  const weatherOptionUrl = filterOptions;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        src={weatherOption.url}
        alt="sunny"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
