import React from 'react';

import RecipeListItem from '../components/RecipeListItem';
import { IRecipe } from '../interfaces/model';

function RecipeList({ recipes }: { recipes: IRecipe[] }) {
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
