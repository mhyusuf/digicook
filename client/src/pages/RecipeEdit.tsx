import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { match, useHistory } from 'react-router-dom';
import { History } from 'history';

import RecipeForm from '../containers/RecipeForm';
import { getRecipe, editRecipe } from '../actions';
import { IRecipe } from '../interfaces/model';
import { IRecipeValues } from '../interfaces/inputs';
import { IState } from '../interfaces/state';

interface MatchInterface {
  recipeId: string;
}

interface RecipeEditProps {
  recipe: IRecipe;
  getRecipe: (id: string) => void;
  editRecipe: (
    id: string,
    updates: IRecipeValues,
    history: History<any>,
  ) => void;
  match: match<MatchInterface>;
}

const RecipeEdit: FunctionComponent<RecipeEditProps> = (props) => {
  const { recipe, getRecipe, editRecipe, match } = props;
  const history = useHistory();
  useEffect(() => {
    getRecipe(match.params.recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    name: recipe.name,
    category: recipe.category,
    image: '',
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
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
          submitHandler={(updates: IRecipeValues) =>
            editRecipe(recipe._id, updates, history)
          }
          initialState={initialState}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

function mapStateToProps(state: IState) {
  return { recipe: state.collections.recipe };
}

export default connect(mapStateToProps, { getRecipe, editRecipe })(RecipeEdit);
