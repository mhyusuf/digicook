import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteRecipe } from '../actions';

function RecipeListItem({ recipe, deleteRecipe }) {
  function handleDelete() {
    deleteRecipe(recipe._id);
  }

  return (
    <>
      <div className="ui top bottom attached header RecipeListItem__header">
        {recipe.name}
        <div>
          <Link
            to={`/my-collections/${recipe._collection}/edit-recipe/${recipe._id}`}
            className="ui button"
          >
            Edit
          </Link>
          <button className="ui button" onClick={handleDelete}>
            Delete
          </button>
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

export default connect(null, { deleteRecipe })(RecipeListItem);
