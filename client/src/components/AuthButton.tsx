import React from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface AuthProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

function AuthButton({ isLoggedIn }: AuthProps) {
  return isLoggedIn ? (
    <li data-test="AuthButtonComponent, LoggedIn">
      <a href="/auth/logout" className="nav-links">
        Log out
      </a>
    </li>
  ) : (
    <li data-test="AuthButtonComponent, LoggedOut">
      <a href="/auth/google" className="nav-links">
        Login with Google
      </a>
    </li>
  );
}

export default AuthButton;
