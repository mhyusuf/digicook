import React from 'react';

import CollectionList from '../containers/CollectionList';

function DiscoverCollections({ collections }) {
  return collections.length ? (
    <CollectionList collections={collections} />
  ) : (
    <div className="ui visible message not-found">
      <p>No collections found</p>
    </div>
  );
}

export default DiscoverCollections;
