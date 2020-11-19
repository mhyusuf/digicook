import React from 'react';

import CollectionListItem from '../components/CollectionListItem';

function CollectionList({ collections }) {
  return (
    <div className="ui cards">
      {collections.map(collection => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionList;
