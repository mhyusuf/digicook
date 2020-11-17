import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLink({ text, to }) {
  return (
    <li>
      <NavLink to={to} className="nav-links">
        {text}
      </NavLink>
    </li>
  );
}

export default NavbarLink;
