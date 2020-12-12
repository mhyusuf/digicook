import React from 'react';

import { ICollectionWithUserObj } from '../interfaces/model';
import CollectionList from './CollectionList';

function DiscoverCollections({
  collections
}: {
  collections: ICollectionWithUserObj[];
}) {
  return collections.length ? (
    <CollectionList collections={collections} />
  ) : (
    <div className="ui visible message not-found">
      <p>No collections found</p>
    </div>
  );
}

export default DiscoverCollections;
