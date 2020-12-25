import React, { useState, useContext, FunctionComponent } from 'react';
import { Link, match, RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { UserContext } from '../context/user';
import { DELETE_RECIPE } from '../services/mutationService';
import { Recipe } from '../interfaces/recipe';
import { GET_RECIPE_DETAIL } from '../services/queryService';
import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from '../components/ModalConfirm';

interface RecipeData {
  getRecipeDetail: Recipe;
}

interface Params {
  recipeId: string;
}

interface RecipeDetailProps extends RouteComponentProps {
  match: match<Params>;
}

const RecipeDetail: FunctionComponent<RecipeDetailProps> = ({
  match,
  history,
}) => {
  const user = useContext(UserContext);
  const [deleteRecipe] = useMutation<{ deleteRecipe: Recipe }>(DELETE_RECIPE);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function toggleModal() {
    setShowDeleteModal((state) => !state);
  }

  const { loading, data } = useQuery<RecipeData>(GET_RECIPE_DETAIL, {
    variables: { _id: match.params.recipeId },
  });

  const recipe = data?.getRecipeDetail;
  const showMenu = user?._id === recipe?._user._id;
  return recipe ? (
    <>
      <div className="ui top attached tabular menu RecipeDetail__header">
        <div className="item active">{recipe.name}</div>
        <div className="right menu">
          <div className="item">
            <button
              className="ui button header__buttons"
              onClick={() => history.goBack()}
            >
              <i className="angle left icon"></i>
              Go back
            </button>
            {showMenu && (
              <>
                <Link
                  to={`/collections/${recipe._collection}/edit-recipe/${recipe._id}`}
                  className="ui button header__buttons"
                >
                  <i className="pencil alternate icon"></i>
                  Edit
                </Link>
                <button
                  className="ui button header__buttons"
                  onClick={toggleModal}
                >
                  <i className="trash alternate icon"></i>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="ui attached segment RecipeDetail">
        <div className="RecipeDetail__top-box">
          <div className="RecipeDetail__img-box">
            <img
              src={recipe._id && `/api/recipes/${recipe._id}/image`}
              alt={recipe.name}
            />
          </div>
          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map(({ name, quantity }, i: number) => {
                  return (
                    <tr key={`${i}/${name}`} className="item">
                      <td data-label="Ingredient">{name}</td>
                      <td date-label="Quantity">{quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="ui header">Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <ModalOverlay show={showDeleteModal}>
        <ModalConfirm
          headerText="Delete recipe"
          onCancel={toggleModal}
          onConfirm={async () => {
            await deleteRecipe({ variables: { _id: recipe._id } });
            history.goBack();
          }}
        >
          <p>Are you sure you want to delete this recipe?</p>
        </ModalConfirm>
      </ModalOverlay>
    </>
  ) : null;
};

export default RecipeDetail;
