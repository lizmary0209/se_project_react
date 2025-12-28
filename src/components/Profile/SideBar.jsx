import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.png";

function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const avatar =
    currentUser?.avatar && currentUser.avatar.trim() !== ""
      ? currentUser.avatar
      : avatarPlaceholder;
  const name = currentUser?.name || "User";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__user-name">{name}</p>
      </div>

      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfile}
      >
        Edit Profile
      </button>
    </aside>
  );
}

export default SideBar;
