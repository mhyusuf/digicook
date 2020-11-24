import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RecipeForm from '../containers/RecipeForm';
import { getRecipe, editRecipe } from '../actions';
import { ICollectionWithUserId, ICollectionWithUserObj } from '../interfaces/model';

function RecipeEdit({ recipe, getRecipe, editRecipe, match, history }: any) {
  useEffect(() => {
    getRecipe(match.params.recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    name: recipe.name,
    category: recipe.category,
    image: '',
    ingredients: recipe.ingredients,
    instructions: recipe.instructions
  };

  return (
    <>
      <div className="ui top attached tabular menu RecipeEdit__header">
        <div className="item active">Edit recipe</div>
        <div className="right menu">
          <div className="item">
            <button className="ui button" onClick={() => history.goBack()}>
              <i className="angle left icon"></i>
              Go back
            </button>
          </div>
        </div>
      </div>
      {recipe._id ? (
        <RecipeForm
          submitHandler={(...args: any) => editRecipe(recipe._id, ...args)}
          initialState={initialState}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

function mapStateToProps({ collections }: any) {
  return { recipe: collections.recipe };
}

export default connect(mapStateToProps, { getRecipe, editRecipe })(RecipeEdit);
