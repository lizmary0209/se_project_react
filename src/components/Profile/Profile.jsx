import "./Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
