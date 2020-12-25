import React, { FunctionComponent } from 'react';

interface AuthProps {
  isLoggedIn: boolean;
}

const AuthButton: FunctionComponent<AuthProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <li>
      <a href="/auth/logout" className="nav-links">
        Log out
      </a>
    </li>
  ) : (
    <li>
      <a href="/auth/google" className="nav-links">
        Login with Google
      </a>
    </li>
  );
};

export default AuthButton;
