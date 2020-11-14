import React from 'react';

function RecipeListItem({ recipe }) {
  return (
    <>
      <div className="ui top bottom attached header RecipeListItem__header">
        {recipe.name}
        <div>
          <button className="ui button">Edit</button>
          <button className="ui button">Delete</button>
        </div>
      </div>
      <div className="ui attached segment">
        <div>
          <img src={`/api/recipes/${recipe._id}/image`} alt={recipe.name} />
        </div>
        <h3 className="ui header">Ingredients</h3>
        <div className="ui list">
          {recipe.ingredients.map(({ _id, name, quantity }) => {
            return (
              <div key={_id} className="item">
                <p>
                  <span>{quantity}: </span>
                  {name}
                </p>
              </div>
            );
          })}
        </div>
        <h3 className="ui header">Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
    </>
  );
}

export default RecipeListItem;
