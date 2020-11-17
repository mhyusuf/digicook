import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createRecipe } from '../actions';
import RecipeForm from '../containers/RecipeForm';

function RecipeCreate({ createRecipe }) {
  const initalFormState = {
    name: '',
    category: '',
    image: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: ''
  };

  return (
    <>
      <div className="ui top attached tabular menu RecipeCreate__header">
        <div className="item active">Create recipe</div>
        <div className="right menu">
          <div className="item">
            <Link className="ui button" to="/user">
              <i className="angle left icon"></i>
              Back to My Collections
            </Link>
          </div>
        </div>
      </div>
      <RecipeForm submitHandler={createRecipe} initialState={initalFormState} />
    </>
  );
}

export default connect(null, { createRecipe })(RecipeCreate);
