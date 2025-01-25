import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./style.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="logo" className="header__image" />
        </div>
        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          {["HOME", "MENU", "MAKE A RESERVATION", "CONTACT US"].map(
            (section) => (
              <h3
                key={section}
                className={`header__link ${
                  activeSection === section ? "active" : ""
                }`}
              >
                {section}
              </h3>
            )
          )}
        </nav>
        <button className="header__menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
    </>
  );
};

export default Header;
