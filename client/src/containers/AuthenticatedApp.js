import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import NavbarLink from '../components/NavbarLink';
import AuthButton from '../components/AuthButton';
import Landing from './Landing';
import Recipes from './Recipes';
import CollectionCreate from '../components/CollectionCreate';
import CollectionDetail from '../components/CollectionDetail';
import CollectionEdit from '../components/CollectionEdit';
import RecipeCreate from '../components/RecipeCreate';
import RecipeEdit from '../components/RecipeEdit';

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <BrowserRouter>
        <Navbar>
          <NavbarLink text="My Recipes" />
          <AuthButton isLoggedIn={true} />
        </Navbar>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/my-collections" component={Recipes} />
            <Route
              path="/my-collections/create-collection"
              component={CollectionCreate}
            />
            <Route
              exact
              path="/my-collections/:id"
              component={CollectionDetail}
            />
            <Route path="/my-collections/:id/edit" component={CollectionEdit} />
            <Route
              path="/my-collections/:id/create-recipe"
              component={RecipeCreate}
            />
            <Route
              path="/my-collections/:collectionId/edit-recipe/:recipeId"
              component={RecipeEdit}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AuthenticatedApp;
