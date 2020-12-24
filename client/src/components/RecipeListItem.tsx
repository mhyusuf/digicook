import React, { FunctionComponent, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/user';
import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from './ModalConfirm';
import { deleteRecipe } from '../actions';
import { Recipe } from '../interfaces/recipe';

interface RecipeListItemProps {
  recipe: Recipe;
  deleteRecipe: (_id: string) => void;
}

export const RecipeListItem: FunctionComponent<RecipeListItemProps> = (
  props,
) => {
  const { recipe, deleteRecipe } = props;
  const user = useContext(UserContext);
  const showMenu = user?._id === recipe._user._id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
          onConfirm={() => deleteRecipe(recipe._id)}
        >
          <p>Are you sure you want to delete this recipe?</p>
        </ModalConfirm>
      </ModalOverlay>
    </>
  );
};

export default connect(null, { deleteRecipe })(RecipeListItem);
