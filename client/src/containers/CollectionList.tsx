import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CollectionListItem from '../components/CollectionListItem';
import { ICollectionWithUserObj } from '../interfaces/model';

interface CollectionListProps extends RouteComponentProps {
  collections: ICollectionWithUserObj[];
}

function CollectionList({ collections }: CollectionListProps) {
  return (
    <div data-test="CollectionListComponent" className="ui cards">
      {collections.map(collection => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionList;
