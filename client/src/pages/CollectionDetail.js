import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCollectionDetail } from '../actions';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';

function CollectionDetail({ match, collection, getCollectionDetail }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    getCollectionDetail(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return collection ? (
    <div>
      <div className="ui top attached header CollectionDetail__header">
        {collection.name}
        <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          <Link className="ui button" to="/my-collections">
            <i className="angle left icon"></i>
            Back to My Collections
          </Link>
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
