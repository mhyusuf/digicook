import React, { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { getCollectionDetail } from '../actions';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';

function CollectionDetail({ match, collection, getCollectionDetail, history }: any) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    getCollectionDetail(match.params.id, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  console.log('rendered');
  return collection ? (
    <div>
      <div className="ui attached tabular menu CollectionDetail__header">
        <div className="item active">{collection.name}</div>
        <div className="right menu">
          <Search
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
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
    <p>'Loading'</p>
  );
}

function mapStateToProps({ collections }: any) {
  return { collection: collections.collectionDetail };
}

export default connect(mapStateToProps, { getCollectionDetail })(CollectionDetail);
