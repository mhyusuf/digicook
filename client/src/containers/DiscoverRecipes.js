import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getPublicRecipes } from '../actions';
import RecipeList from './RecipeList';

function DiscoverRecipes({ recipeList, getPublicRecipes }) {
  useEffect(() => {
    getPublicRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return recipeList.length && <RecipeList recipes={recipeList} />;
}

function mapStateToProps({ collections }) {
  return { recipeList: collections.recipeList };
}

export default connect(mapStateToProps, { getPublicRecipes })(DiscoverRecipes);
