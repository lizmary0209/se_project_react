import "./Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} />
    </section>
  );
}

export default Profile;
