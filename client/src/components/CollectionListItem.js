import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalOverlay from './ModalOverlay';
import ModalConfirm from './ModalConfirm';
import { deleteCollection } from '../actions';

function CollectionListItem({ collection, history, deleteCollection }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function toggleModal() {
    setShowDeleteModal((state) => !state);
  }
  return (
    <div className="card">
      {!imageLoaded && (
        <div className="image">
          <div className="ui placeholder">
            <div className="square image"></div>
          </div>
        </div>
      )}
      <div
        className="image"
        onClick={() => history.push(`/my-collections/${collection._id}`)}
      >
        <img
          alt={`${collection.name}`}
          src={`/api/collections/${collection._id}/image`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div
        className="content"
        onClick={() => history.push(`/my-collections/${collection._id}`)}
      >
        <div className="header">{collection.name}</div>
        <div className="meta">{collection._user.name}</div>
        <div className="description">{collection.description}</div>
      </div>
      <div className="ui bottom attached menu" style={{ overflow: 'hidden' }}>
        <div className="item">
          <Link
            className="ui button"
            to={`/my-collections/${collection._id}/create-recipe`}
          >
            <i className="add icon"></i>
            Add recipe
          </Link>
        </div>
        <div className="item">
          <Link
            className="ui button"
            to={`/my-collections/${collection._id}/edit`}
          >
            <i className="pencil alternate icon"></i>
            Edit
          </Link>
        </div>
        <div className="item">
          <button className="ui button" onClick={toggleModal}>
            <i className="trash alternate icon"></i>
            Delete
          </button>
        </div>
      </div>
      <ModalOverlay show={showDeleteModal}>
        <ModalConfirm
          headerText="Delete collection"
          onCancel={toggleModal}
          onConfirm={() => deleteCollection(collection._id)}
        >
          <p>Are you sure you want to delete this collection?</p>
          <div className="ui warning message">
            Warning: this will also delete all recipes in this collection.
          </div>
        </ModalConfirm>
      </ModalOverlay>
    </div>
  );
}

export default withRouter(
  connect(null, { deleteCollection })(CollectionListItem)
);
