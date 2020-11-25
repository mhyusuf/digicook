import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ children }: {children: JSX.Element | JSX.Element[]}) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(state => !state);
  }

  return (
    <nav className="Navbar">
      <span className="Navbar__toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </span>
      <NavLink to="/" className="Navbar__logo">
        <h2>digicook</h2>
      </NavLink>
      <ul className={`Navbar__main ${showMenu ? 'active' : ''}`}>{children}</ul>
    </nav>
  );
}

export default Navbar;
