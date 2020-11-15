import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteCollection } from '../actions';

function CollectionListItem({ collection, history, deleteCollection }) {
  return (
    <div className="card">
      <div
        className="image"
        onClick={() => history.push(`/my-collections/${collection._id}`)}
      >
        <img
          alt={`${collection.name}`}
          src={`/api/collections/${collection._id}/image`}
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
          <button
            className="ui button"
            onClick={() => deleteCollection(collection._id)}
          >
            <i className="trash alternate icon"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { deleteCollection })(CollectionListItem)
);
