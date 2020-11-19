import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections, showMenu } from '../actions';
import CollectionList from '../containers/CollectionList';
import Search from '../components/Search';

function MyCollections({ _id, collections, getUserCollections, showMenu }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    getUserCollections(_id, query);
    showMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);


  return (
    <div className="Recipes">
      <div className="ui top attached tabular menu Recipes__header">
        <div className="item active">My collections</div>
        <div className="right menu">
          <Search
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search my collections"
          />
          <div className="item">
            <Link className="ui button" to="/create-collection">
              <i className="add icon"></i>
              Add collection
            </Link>
          </div>
        </div>
      </div>
      {collections.length ? (
        <div className="ui attached segment Recipes__content">
          <CollectionList collections={collections} />
        </div>
      ) : (
        <div className="ui visible message not-found">
          <p>No collections found</p>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ auth, collections }) {
  return { _id: auth._id, collections: collections.collectionList };
}

export default connect(mapStateToProps, { getUserCollections, showMenu })(
  MyCollections
);
