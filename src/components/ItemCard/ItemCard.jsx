import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => onCardClick(item);

  return (
    <li className="item-card" onClick={handleCardClick}>
      <h2 className="item-card__name">{item.name}</h2>
      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
