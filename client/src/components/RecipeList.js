import React from 'react';

import RecipeListItem from './RecipeListItem';

function RecipeList({ recipes }) {
  return recipes ? (
    <div className="ui segments">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe._id} recipe={recipe} />
      ))}
    </div>
  ) : (
    'Loading'
  );
}

export default RecipeList;
