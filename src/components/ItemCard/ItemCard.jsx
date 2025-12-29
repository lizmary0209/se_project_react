import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLoggedIn || !currentUser) return;

    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card" onClick={handleCardClick}>
      <div className="item-card__header">
        <span className="item-card__title">{item.name}</span>

        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          />
        )}
      </div>

      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
