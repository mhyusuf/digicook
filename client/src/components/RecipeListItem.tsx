import React, { FunctionComponent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { UserContext } from '../context/user';
import { DELETE_RECIPE } from '../services/mutationService';
import { Recipe } from '../interfaces/recipe';
import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from './ModalConfirm';

interface RecipeListItemProps {
  recipe: Recipe;
}

export const RecipeListItem: FunctionComponent<RecipeListItemProps> = ({
  recipe,
}) => {
  const user = useContext(UserContext);
  const showMenu = user?._id === recipe._user._id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecipe] = useMutation<{ deleteRecipe: Recipe }>(DELETE_RECIPE);
  const history = useHistory();
  function toggleModal() {
    setShowDeleteModal((state) => !state);
  }
  return (
    <>
      <div
        data-test="RecipeListItemComponent"
        className="ui card RecipeListItem"
      >
        <Link
          className="image"
          to={`/collections/${recipe._collection}/recipes/${recipe._id}`}
        >
          <img src={`/api/recipes/${recipe._id}/image`} alt={recipe.name} />
        </Link>
        <Link
          className="content"
          to={`/collections/${recipe._collection}/recipes/${recipe._id}`}
        >
          <div className="header">{recipe.name}</div>
          <div className="meta">
            <p>{recipe.category}</p>
          </div>
        </Link>
        {showMenu && (
          <div
            className="ui two item bottom attached menu"
            style={{ overflow: 'hidden' }}
          >
            <div className="item">
              <Link
                className="ui button"
                to={`/collections/${recipe._collection}/edit-recipe/${recipe._id}`}
              >
                <i className="pencil alternate icon"></i>
                Edit
              </Link>
            </div>
            <div className="item" onClick={toggleModal}>
              <button className="ui button">
                <i className="trash alternate icon"></i>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <ModalOverlay show={showDeleteModal}>
        <ModalConfirm
          headerText="Delete recipe"
          onCancel={toggleModal}
          onConfirm={async () => {
            await deleteRecipe({ variables: { _id: recipe._id } });
            history.go(0);
          }}
        >
          <p>Are you sure you want to delete this recipe?</p>
        </ModalConfirm>
      </ModalOverlay>
    </>
  );
};

export default RecipeListItem;
