import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getPublicCollections } from '../actions';
import CollectionList from '../containers/CollectionList';

function DiscoverCollections({ collections, getPublicCollections }) {
  useEffect(() => {
    getPublicCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return collections.length && <CollectionList collections={collections} />;
}

function mapStateToProps({ collections }) {
  return { collections: collections.collectionList };
}

export default connect(mapStateToProps, { getPublicCollections })(
  DiscoverCollections
);
