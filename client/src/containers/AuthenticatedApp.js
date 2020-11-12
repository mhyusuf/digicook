import React from 'react';

import Navbar from './Navbar';
import AuthButton from '../components/AuthButton';
import Search from '../components/Search';

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <Navbar>
        <AuthButton isLoggedIn={true} />
      </Navbar>
      <div className="wrapper">
        <Search />
      </div>
    </div>
  );
};

export default AuthenticatedApp;