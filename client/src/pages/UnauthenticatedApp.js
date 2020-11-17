import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from '../containers/Navbar';
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
          <AuthButton isLoggedIn={false} />
        </Navbar>
        <div className="wrapper">
          <SignupMessage />
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/my-collections/:id"
            component={CollectionDetail}
          />
          <Route
            path="/my-collections/:collectionId/recipes/:recipeId"
            component={RecipeDetail}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default UnauthenticatedApp;
