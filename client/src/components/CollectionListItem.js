import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function CollectionListItem({ collection, history }) {
  return (
    <Link to={`/my-collections/${collection._id}`} className="card">
      <div className="image">
        <img
          alt={`${collection.name}`}
          src={`/api/collections/${collection._id}/image`}
        />
      </div>
      <div className="content">
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
            <i class="pencil alternate icon"></i>
            Edit
          </Link>
        </div>
        <div className="item">
          <button className="ui button">
            <i class="trash alternate icon"></i>
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}

export default withRouter(CollectionListItem);
