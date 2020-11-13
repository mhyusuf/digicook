import React from 'react';

function RecipeListItem({ recipe }) {
  return (
    <>
      <h3 className="ui top attached header">{recipe.name}</h3>
      <div className="ui attached segment">
        <div>
          <img src={`/api/recipes/${recipe._id}/image`} alt={recipe.name} />
        </div>
      </div>
    </>
  );
}

export default RecipeListItem;
