import React from 'react';

import RecipeListItem from '../components/RecipeListItem';
import { Recipe } from '../interfaces/recipe';

function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return recipes ? (
    <div className="ui bottom attached segment">
      <div className="ui cards">
        {recipes.map((recipe) => (
          <RecipeListItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  ) : (
    <p>'Loading'</p>
  );
}

export default RecipeList;
