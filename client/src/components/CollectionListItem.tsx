import React, { FunctionComponent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { UserContext } from '../context/user';
import { DELETE_COLLECTION } from '../services/mutationService';
import { Collection } from '../interfaces/collection';
import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from './ModalConfirm';

interface CollectionListItemProps {
  collection: Collection;
}

export const CollectionListItem: FunctionComponent<CollectionListItemProps> = ({
  collection,
}) => {
  const user = useContext(UserContext);
  const showMenu = user?._id === collection._user._id;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCollection] = useMutation<{ deleteCollection: Collection }>(
    DELETE_COLLECTION,
  );
  const history = useHistory();

  function toggleModal() {
    setShowDeleteModal((state) => !state);
  }

  return (
    <>
      <div className="card CollectionListItem">
        {!imageLoaded && (
          <div className="image">
            <div className="ui placeholder">
              <div className="square image"></div>
            </div>
          </div>
        )}
        <div
          className="image"
          onClick={() => history.push(`/collections/${collection._id}`)}
        >
          <img
            alt={`${collection.name}`}
            src={`/api/collections/${collection._id}/image`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div
          className="content"
          onClick={() => history.push(`/collections/${collection._id}`)}
        >
          <div className="header">{collection.name}</div>
          <div className="meta">{collection._user.name}</div>
          <div className="description">{collection.description}</div>
        </div>
        {showMenu && (
          <div
            className="ui bottom attached menu"
            style={{ overflow: 'hidden' }}
          >
            <div className="item">
              <Link
                className="ui button"
                to={`/collections/${collection._id}/create-recipe`}
              >
                <i className="add icon"></i>
                Add recipe
              </Link>
            </div>
            <div className="item">
              <Link
                className="ui button"
                to={`/collections/${collection._id}/edit`}
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
        )}
      </div>
      <ModalOverlay show={showDeleteModal}>
        <ModalConfirm
          headerText="Delete collection"
          onCancel={toggleModal}
          onConfirm={async () => {
            await deleteCollection({ variables: { _id: collection._id } });
            toggleModal();
          }}
        >
          <p>Are you sure you want to delete this collection?</p>
          <div className="ui warning message">
            Warning: this will also delete all recipes in this collection.
          </div>
        </ModalConfirm>
      </ModalOverlay>
    </>
  );
};

export default CollectionListItem;
