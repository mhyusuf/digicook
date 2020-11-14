import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections } from '../actions';
import CollectionList from '../components/CollectionList';

function Recipes({ _id, collections, getUserCollections }) {
  useEffect(() => {
    getUserCollections(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="ui top attached header">My collections</div>
      <div className="ui attached segment">
        <Link to="/my-collections/create-collection">Add collection</Link>
        <CollectionList collections={collections} />
      </div>
    </div>
  );
}

function mapStateToProps({ auth, collections }) {
  return { _id: auth._id, collections: collections.collectionList };
}

export default connect(mapStateToProps, { getUserCollections })(Recipes);
