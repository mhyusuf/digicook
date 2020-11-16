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
      <div className="ui top attached header RecipeCreate__header">
        Create recipe
        <div>
          <Link className="ui button" to="/my-collections">
            <i className="angle left icon"></i>
            Back to My Collections
          </Link>
        </div>
      </div>
      <RecipeForm submitHandler={createRecipe} initialState={initalFormState} />
    </>
  );
}

export default connect(null, { createRecipe })(RecipeCreate);
