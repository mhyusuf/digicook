import React from 'react';

import Navbar from './Navbar';
import AuthButton from '../components/AuthButton';

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <Navbar>
        <AuthButton isLoggedIn={true} />
      </Navbar>
    </div>
  );
};

export default AuthenticatedApp;