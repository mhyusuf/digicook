import React from 'react';

import Navbar from './Navbar';
import AuthButton from '../components/AuthButton';

function UnauthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <Navbar>
        <AuthButton isLoggedIn={false} />
      </Navbar>
    </div>
  );
};

export default UnauthenticatedApp;