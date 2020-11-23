import React from 'react';
import { ICollectionWithUserObj } from '../interfaces/model';
import CollectionListItem from '../components/CollectionListItem';


function CollectionList({ collections }: {collections: ICollectionWithUserObj[]}) {
  return (
    <div data-test="CollectionListComponent" className="ui cards">
      {collections.map(collection => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionList;
