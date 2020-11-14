import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';
import { getRecipe, editRecipe } from '../actions';

function RecipeEdit({ recipe, getRecipe, editRecipe, match }) {
  useEffect(() => {
    getRecipe(match.params.recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="ui top attached header">Edit recipe</h3>
      {recipe._id ? (
        <RecipeForm
          submitHandler={(...args) => editRecipe(recipe._id, ...args)}
          initialState={recipe}
        />
      ) : (
        'Loading'
      )}
    </>
  );
}

function mapStateToProps({ collections }) {
  return { recipe: collections.recipe };
}

export default connect(mapStateToProps, { getRecipe, editRecipe })(RecipeEdit);
