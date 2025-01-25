import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./style.css";
import MenuItemList from "../MenuItemList/MenuItemList";
const MenuList = ({ menus, onAddMenu }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const handleAddMenu = async () => {
    if (!menuName.trim() || !menuDescription.trim()) {
      setErrors(["Menu name and description are required."]);
      return;
    }

    try {
      const response = await axiosInstance.post("/menus", {
        name: menuName,
        description: menuDescription,
      });

      onAddMenu(response.data);
      setShowPopup(false);
      setMenuName("");
      setMenuDescription("");
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    }
  };

  return (
    <div className="menu-list">
      <button className="add-menu-btn" onClick={() => setShowPopup(true)}>
        Add Menu
      </button>
      <div className="menuitem-top">
        {menus.map((menu) => (
          <div
            key={menu._id}
            className={`menu-item ${menu.isSelected ? "active" : ""}`}
            onClick={() => handleSelectMenu(menu)}
          >
            <div>
              <h3>{menu.name}</h3>
              <p>{menu.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Show MenuItemList if a menu is selected */}
      {selectedMenu && <MenuItemList selectedMenu={selectedMenu} />}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a New Menu</h3>
            <input
              type="text"
              placeholder="Menu Name"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
            <textarea
              placeholder="Menu Description"
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
            />
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {error}
                  </p>
                ))}
              </div>
            )}
            <div className="popup-actions">
              <button onClick={handleAddMenu}>Save</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
