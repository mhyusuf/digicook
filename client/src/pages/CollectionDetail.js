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
      <div className="ui attached tabular menu CollectionDetail__header">
        <div className="item active">{collection.name}</div>
        <div className="right menu">
          <Search
            attached
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${collection.name}`}
          />
          <div className="item">
            <button className="ui button" onClick={() => history.goBack()}>
              <i className="angle left icon"></i>Go back
            </button>
          </div>
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
