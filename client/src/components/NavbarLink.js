import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLink({ text, to }) {
  return (
    <li>
      <NavLink
        activeClassName="nav-link-active"
        exact
        to={to}
        className="nav-links"
      >
        {text}
      </NavLink>
    </li>
  );
}

export default NavbarLink;
