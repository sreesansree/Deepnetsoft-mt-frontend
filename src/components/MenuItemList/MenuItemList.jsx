import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import "./style.css";

const MenuItemList = ({ selectedMenu }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [errors, setErrors] = useState([]);

  // Fetch menu items when a menu is selected
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (selectedMenu?.id) {
        try {
          const response = await axiosInstance.get(`/menus/${selectedMenu.id}/items`);
          setMenuItems(response.data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      }
    };

    fetchMenuItems();
  }, [selectedMenu]);

  const handleAddMenuItem = async () => {
    if (!itemName.trim() || !itemDescription.trim() || !itemPrice.trim()) {
      setErrors(["Item name, description, and price are required."]);
      return;
    }

    try {
      const response = await axiosInstance.post(`/menus/${selectedMenu.id}/items`, {
        name: itemName,
        description: itemDescription,
        price: parseFloat(itemPrice),
      });

      setMenuItems((prevItems) => [...prevItems, response.data]);
      setShowPopup(false);
      setItemName("");
      setItemDescription("");
      setItemPrice("");
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
    <div className="menu-item-list">
      <h2>{selectedMenu?.name}</h2>
      <p>{selectedMenu?.description}</p>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <button className="add-item-btn" onClick={() => setShowPopup(true)}>
        Add Menu Item
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a New Menu Item</h3>
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <textarea
              placeholder="Item Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
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
              <button onClick={handleAddMenuItem}>Save</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemList;
