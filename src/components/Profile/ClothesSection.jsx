import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleAddClick }) {
  return (
    <section className="clothes-section">
      <button onClick={handleAddClick} className="clothes-section__add-btn">
        + Add clothes
      </button>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={() => {}} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
