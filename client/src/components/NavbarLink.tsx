import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarLinkProps {
  text: string;
  to: string;
}

const NavbarLink: FunctionComponent<NavbarLinkProps> = (props) => {
  const { text, to } = props;
  return (
    <li data-test="NavbarLinkComponent">
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
};

export default NavbarLink;
