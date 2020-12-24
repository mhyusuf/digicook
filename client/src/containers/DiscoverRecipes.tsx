import React from 'react';

import { Recipe } from '../interfaces/recipe';
import RecipeList from './RecipeList';

function DiscoverRecipes({ recipes }: { recipes: Recipe[] }) {
  return recipes.length ? (
    <RecipeList recipes={recipes} />
  ) : (
    <div className="ui visible message not-found">
      <p>No recipes found</p>
    </div>
  );
}

export default DiscoverRecipes;
