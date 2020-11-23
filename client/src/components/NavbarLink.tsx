import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';

interface NavbarLinkProps extends RouteComponentProps {
  text: string;
  to: string;
}

function NavbarLink({ text, to }: NavbarLinkProps) {
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
