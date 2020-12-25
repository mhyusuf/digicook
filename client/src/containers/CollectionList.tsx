import React, { FunctionComponent } from 'react';

import { Collection } from '../interfaces/collection';
import CollectionListItem from '../components/CollectionListItem';

interface CollectionListProps {
  collections: Collection[];
}

const CollectionList: FunctionComponent<CollectionListProps> = (props) => {
  const { collections } = props;
  return (
    <div className="ui cards">
      {collections.map((collection) => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
