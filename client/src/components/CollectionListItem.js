import React from 'react';
import { Link } from 'react-router-dom';

function CollectionListItem({ collection }) {
  return (
    <div className="card">
      <div className="image">
        <img alt={`${collection.name}`} src={`/api/collections/${collection._id}/image`}/>
      </div>
      <div className="content">
        <div className="header">{collection.name}</div>
        <div className="meta">{collection._user.name}</div>
        <div className="description">{collection.description}</div>
      </div>
      <Link className="ui bottom attached button" to={`/my-collections/${collection._id}/create-recipe`}>
        <i className="add icon"></i>
        Add recipe
      </Link>
    </div>
  );
};

export default CollectionListItem