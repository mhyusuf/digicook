import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createRecipe } from '../actions';
import RecipeForm from '../containers/RecipeForm';

const RecipeCreate: FunctionComponent<any> = ({ createRecipe }: any) => {
  const intialFormState = {
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
      <RecipeForm submitHandler={createRecipe} initialState={intialFormState} />
    </>
  );
}

export default connect(null, { createRecipe })(RecipeCreate);
