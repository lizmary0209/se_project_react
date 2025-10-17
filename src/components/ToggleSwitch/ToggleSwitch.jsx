import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={currentTempertureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
