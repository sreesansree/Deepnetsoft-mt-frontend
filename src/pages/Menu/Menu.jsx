import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import MenuList from "../../components/MenuList/MenuList";
import axiosInstance from "../../services/axiosInstance";
import MenuItemList from "../../components/MenuItemList/MenuItemList";
import './style.css'
const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // Fetch the menus when the component mounts
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get("/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Function to add a new menu to the list
  const handleAddMenu = (newMenu) => {
    setMenus((prevMenus) => [...prevMenus, newMenu]);
  };

  // Function to handle selecting a menu
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <Banner />
      <div className="menu-container">
        {/* Menu List - always visible */}
        <MenuList
          menus={menus}
          onAddMenu={handleAddMenu}
          onSelectMenu={handleSelectMenu}
          selectedMenu={selectedMenu}
        />
        {/* Menu Items of selected menu */}
      </div>
    </div>
  );
};

export default Menu;
