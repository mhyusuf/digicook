import React, { FunctionComponent } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { Link, RouteComponentProps } from 'react-router-dom';

import { CREATE_RECIPE } from '../services/mutationService';
import { Recipe } from '../interfaces/recipe';
import { IRecipeValues } from '../interfaces/inputs';
import RecipeForm from '../containers/RecipeForm';

const RecipeCreate: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [createRecipe] = useMutation<{ createRecipe: Recipe }>(CREATE_RECIPE);

  async function handleSubmit(values: IRecipeValues) {
    const {
      name,
      category,
      ingredients,
      instructions,
      imageData,
      collection,
    } = values;
    console.log(collection);
    const res = await createRecipe({
      variables: {
        name,
        category,
        ingredients,
        instructions,
        _collection: collection,
      },
    });
    const { _id } = res.data!.createRecipe;
    await axios.post(`/api/recipes/${_id}/image`, imageData);
    history.push('/user');
  }

  const intialFormState: IRecipeValues = {
    name: '',
    category: '',
    image: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
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
      <RecipeForm submitHandler={handleSubmit} initialState={intialFormState} />
    </>
  );
};

export default RecipeCreate;
