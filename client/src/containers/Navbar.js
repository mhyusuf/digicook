import React, { useState } from 'react';

function Navbar({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu((state) => setShowMenu(!state));
  };

  return (
    <nav className="Navbar">
      <span className="Navbar__toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </span>
      <div className="Navbar__logo">
        <h2>digicook</h2>
      </div>
      <ul className={`Navbar__main ${showMenu ? 'active' : ''}`}>
        <li>
          { children }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;