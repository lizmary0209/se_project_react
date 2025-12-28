import "./Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ clothingItems, onCardClick, onAddClick, onEditProfile }) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}

export default Profile;
