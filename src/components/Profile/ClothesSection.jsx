import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = currentUser?._id
    ? clothingItems.filter((item) => {
        const ownerId = item?.owner?._id || item?.owner;
        return ownerId === currentUser._id;
      })
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      {userClothingItems.length === 0 ? (
        <p className="clothes-section__empty">
          You haven't added any items yet.
        </p>
      ) : (
        <ul className="clothes-section__items">
          {userClothingItems.map((item) => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
