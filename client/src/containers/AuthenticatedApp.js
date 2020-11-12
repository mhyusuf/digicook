import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './Navbar';
import NavbarLink from '../components/NavbarLink'
import AuthButton from '../components/AuthButton';
import Landing from './Landing';
import Recipes from './Recipes';
import CollectionCreate from '../components/CollectionCreate';

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <BrowserRouter>
        <Navbar>
          <NavbarLink text="My Recipes" />
          <AuthButton isLoggedIn={true} />
        </Navbar>
        <div className="wrapper">
          <Route exact path="/" component={Landing} />
          <Route exact path="/my-recipes" component={Recipes} />
          <Route path="/my-recipes/create-collection" component={CollectionCreate} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AuthenticatedApp;