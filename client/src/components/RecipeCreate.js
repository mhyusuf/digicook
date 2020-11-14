import React from 'react';
import { connect } from 'react-redux';

import { createRecipe } from '../actions';
import RecipeForm from './RecipeForm';

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
      <h3 className="ui top attached header">Create recipe</h3>
      <RecipeForm submitHandler={createRecipe} initialState={initalFormState} />
    </>
  );
}

export default connect(null, { createRecipe })(RecipeCreate);
