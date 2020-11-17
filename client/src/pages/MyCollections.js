import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections, showMenu } from '../actions';
import CollectionList from '../containers/CollectionList';
import Loader from '../components/Loader';
import Search from '../components/Search';

function MyColletions({ _id, collections, getUserCollections, showMenu }) {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  useEffect(() => {
    getUserCollections(_id, query);
    setIsLoading(false);
    showMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="Recipes">
      {isLoading && <Loader />}
      <div className="ui top attached header Recipes__header">
        My collections
        <Search value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          <Link className="ui button" to="/collections/create-collection">
            <i className="add icon"></i>
            Add collection
          </Link>
        </div>
      </div>
      {collections.length ? (
        <div className="ui attached segment Recipes__content">
          <CollectionList collections={collections} />
        </div>
      ) : (
        <div className="ui visible message">
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
  MyColletions
);
