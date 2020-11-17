import React from 'react';

import RecipeList from './RecipeList';

function DiscoverRecipes({ recipes }) {
  return recipes.length ? (
    <RecipeList recipes={recipes} />
  ) : (
    <div className="ui visible message not-found">
      <p>No recipes found</p>
    </div>
  );
}

export default DiscoverRecipes;
