import React, { FunctionComponent } from 'react';

import { ICollectionWithUserObj } from '../interfaces/model';
import CollectionListItem from '../components/CollectionListItem';

interface CollectionListProps {
  collections: ICollectionWithUserObj[];
}

const CollectionList: FunctionComponent<CollectionListProps> = (props) => {
  const { collections } = props;
  return (
    <div data-test="CollectionListComponent" className="ui cards">
      {collections.map((collection) => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
