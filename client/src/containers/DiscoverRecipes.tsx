import React from 'react';

import { IRecipe } from '../interfaces/model';
import RecipeList from './RecipeList';

function DiscoverRecipes({ recipes }: { recipes: IRecipe[] }) {
  return recipes.length ? (
    <RecipeList recipes={recipes} />
  ) : (
    <div className="ui visible message not-found">
      <p>No recipes found</p>
    </div>
  );
}

export default DiscoverRecipes;
