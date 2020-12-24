import React from 'react';

import { Collection } from '../interfaces/collection';
import CollectionList from './CollectionList';

function DiscoverCollections({ collections }: { collections: Collection[] }) {
  return collections.length ? (
    <CollectionList collections={collections} />
  ) : (
    <div className="ui visible message not-found">
      <p>No collections found</p>
    </div>
  );
}

export default DiscoverCollections;
