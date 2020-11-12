import React from 'react';

function AuthButton({ isLoggedIn }) {
  return (
    isLoggedIn
      ? <a href="/auth/logout" className="nav-links">Log out</a>
      : <a href="/auth/google" className="nav-links">Login with Google</a>
  );
};

export default AuthButton;