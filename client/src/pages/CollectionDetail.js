import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCollectionDetail } from '../actions';
import RecipeList from '../containers/RecipeList';

function CollectionDetail({ match, collection, getCollectionDetail }) {
  useEffect(() => {
    getCollectionDetail(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return collection ? (
    <div>
      <h1 className="ui header">{collection.name}</h1>
      <RecipeList recipes={collection._recipes} />
    </div>
  ) : (
    'Loading'
  );
}

function mapStateToProps({ collections }) {
  return { collection: collections.collectionDetail };
}

export default connect(mapStateToProps, { getCollectionDetail })(
  CollectionDetail
);
