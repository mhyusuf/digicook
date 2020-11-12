import React from 'react';

import Navbar from './Navbar';
import AuthButton from '../components/AuthButton';
import Search from '../components/Search';

function UnauthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <Navbar>
        <AuthButton isLoggedIn={false} />
      </Navbar>
      <Search />
    </div>
  );
};

export default UnauthenticatedApp;