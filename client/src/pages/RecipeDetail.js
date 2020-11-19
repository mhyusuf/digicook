import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from '../components/ModalConfirm';
import { getRecipe, deleteRecipe } from '../actions';

function RecipeDetail({
  recipe,
  getRecipe,
  deleteRecipe,
  match,
  history,
  menus
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function toggleModal() {
    setShowDeleteModal(state => !state);
  }

  useEffect(() => {
    getRecipe(match.params.recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            {menus && (
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
            <img src={`/api/recipes/${recipe._id}/image`} alt={recipe.name} />
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
                {recipe.ingredients.map(({ _id, name, quantity }) => {
                  return (
                    <tr key={_id} className="item">
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
          onConfirm={() => deleteRecipe(recipe._id)}
        >
          <p>Are you sure you want to delete this recipe?</p>
        </ModalConfirm>
      </ModalOverlay>
    </>
  );
}

function mapStateToProps({ collections, menus }) {
  return { recipe: collections.recipe, menus };
}

export default connect(mapStateToProps, { getRecipe, deleteRecipe })(
  RecipeDetail
);
