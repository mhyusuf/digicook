import React, { FunctionComponent } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@apollo/client';
import { match, useHistory } from 'react-router-dom';

import { GET_RECIPE_DETAIL } from '../services/queryService';
import { UPDATE_RECIPE } from '../services/mutationService';
import { Recipe } from '../interfaces/recipe';
import RecipeForm from '../containers/RecipeForm';
import { IRecipe } from '../interfaces/model';
import { IRecipeValues } from '../interfaces/inputs';

interface RecipeData {
  getRecipeDetail: Recipe;
}

interface Params {
  recipeId: string;
}

interface RecipeEditProps {
  recipe: IRecipe;
  getRecipe: (id: string) => void;
  match: match<Params>;
}

const RecipeEdit: FunctionComponent<RecipeEditProps> = (props) => {
  const { match } = props;
  const history = useHistory();

  const { loading, data } = useQuery<RecipeData>(GET_RECIPE_DETAIL, {
    variables: { _id: match.params.recipeId },
  });

  const [updateRecipe] = useMutation<{ updateRecipe: Recipe }>(UPDATE_RECIPE);

  const recipe = data?.getRecipeDetail;
  const initialState = {
    name: recipe?.name,
    category: recipe?.category,
    image: '',
    ingredients: recipe?.ingredients,
    instructions: recipe?.instructions,
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
      {recipe ? (
        <RecipeForm
          submitHandler={async (updates: IRecipeValues) => {
            const {
              name,
              category,
              instructions,
              imageData,
              ingredients,
            } = updates;
            await updateRecipe({
              variables: {
                _id: match.params.recipeId,
                name,
                category,
                instructions,
                ingredients,
              },
            });
            if (imageData && imageData.get('image')) {
              await axios.post(
                `/api/recipes/${match.params.recipeId}/image`,
                imageData,
              );
            }
            history.goBack();
          }}
          initialState={initialState}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default RecipeEdit;
