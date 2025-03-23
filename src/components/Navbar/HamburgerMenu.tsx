"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface HamburgerMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)} 
      className="text-white focus:outline-none"
      aria-label="Toggle Menu"
    >
      <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
    </button>
  );
};

export default HamburgerMenu;