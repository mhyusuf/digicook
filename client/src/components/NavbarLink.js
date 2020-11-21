import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLink({ text, to }) {
  return (
    <li data-test="NavbarLinkComponent">
      <NavLink // Component imported from react-router-dom
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
