import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../containers/Navbar';
import NavbarLink from '../components/NavbarLink';
import AuthButton from '../components/AuthButton';
import Landing from './Landing';
import MyCollections from './MyCollections';
import CollectionCreate from './CollectionCreate';
import CollectionDetail from './CollectionDetail';
import RecipeDetail from './RecipeDetail';
import CollectionEdit from './CollectionEdit';
import RecipeCreate from './RecipeCreate';
import RecipeEdit from './RecipeEdit';

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <BrowserRouter>
        <Navbar>
          <NavbarLink text="Home" to="/" />
          <NavbarLink text="My Recipes" to="/user" />
          <AuthButton isLoggedIn={true} />
        </Navbar>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user" component={MyCollections} />
            <Route
              exact
              path="/create-collection"
              component={CollectionCreate}
            />
            <Route exact path="/collections/:id" component={CollectionDetail} />
            <Route
              path="/collections/:collectionId/recipes/:recipeId"
              component={RecipeDetail}
            />
            <Route path="/collections/:id/edit" component={CollectionEdit} />
            <Route
              path="/collections/:id/create-recipe"
              component={RecipeCreate}
            />
            <Route
              path="/collections/:collectionId/edit-recipe/:recipeId"
              component={RecipeEdit}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AuthenticatedApp;
