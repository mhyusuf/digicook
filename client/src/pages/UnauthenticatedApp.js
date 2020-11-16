import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../containers/Navbar';
import AuthButton from '../components/AuthButton';
import Search from '../components/Search';

function UnauthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <BrowserRouter>
        <Navbar>
          <AuthButton isLoggedIn={false} />
        </Navbar>
        <div className="wrapper">
          <Search />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default UnauthenticatedApp;
