import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections } from '../actions';
import CollectionList from '../components/CollectionList';

function Recipes({ _id, collections, getUserCollections }) {
  useEffect(() => {
    getUserCollections(_id);
  }, []);

  return (
    <div>
      <div className="ui top attached header">
        My collections
      </div>
      <div className="ui attached segment">
        <Link to="/my-recipes/create-collection">Add collection</Link>
        <CollectionList collections={collections} />
      </div>
    </div>
  );
};

function mapStateToProps({ auth, collections }) {
  return { _id: auth._id, collections }
}

export default connect(mapStateToProps, { getUserCollections })(Recipes);