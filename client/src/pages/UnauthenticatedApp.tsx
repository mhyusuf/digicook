import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../containers/Navbar';
import NavbarLink from '../components/NavbarLink';
import AuthButton from '../components/AuthButton';
import SignupMessage from '../components/SignupMessage';
import Landing from './Landing';
import CollectionDetail from './CollectionDetail';
import RecipeDetail from './RecipeDetail';

function UnauthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <BrowserRouter>
        <Navbar>
          <NavbarLink text="Home" to="/" />
          <AuthButton isLoggedIn={false} />
        </Navbar>
        <div className="wrapper">
          <SignupMessage />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/collections/:id" component={CollectionDetail} />
            <Route
              path="/collections/:collectionId/recipes/:recipeId"
              component={RecipeDetail}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default UnauthenticatedApp;
