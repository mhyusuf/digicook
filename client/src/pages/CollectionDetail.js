import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCollectionDetail } from '../actions';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';

function CollectionDetail({ match, collection, getCollectionDetail, history }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    getCollectionDetail(match.params.id, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return collection ? (
    <div>
      <div className="ui top attached header CollectionDetail__header">
        {collection.name}
        <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          <button className="ui button" onClick={() => history.goBack()}>
            <i className="angle left icon"></i>
            Go back
          </button>
        </div>
      </div>
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
