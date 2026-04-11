import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  handleCardClick,
  onCardLike,
  isLoggedIn,
  isItemsLoading,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type.toLowerCase();
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>

        {isItemsLoading ? (
          <p className="cards__loading">Loading outfit suggestions...</p>
        ) : filteredItems.length > 0 ? (
          <ul className="cards__list">
            {filteredItems.map((item) => {
              return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
               />
              );
            })}
          </ul>
        ) : (
          <p className="cards__empty">No clothing items match this weather yet.</p>
        )}
      </section>
    </main>
  );
}

export default Main;
