import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections } from '../actions';
import CollectionList from '../components/CollectionList';
import Loader from '../components/Loader';

function Recipes({ _id, collections, getUserCollections }) {
  useEffect(() => {
    getUserCollections(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Recipes">
      {collections.length ? (
        <>
          <div className="ui top attached header Recipes__header">
            My collections
            <div>
              <Link
                className="ui button"
                to="/my-collections/create-collection"
              >
                <i className="add icon"></i>
                Add collection
              </Link>
            </div>
          </div>
          <div className="ui attached segment Recipes__content">
            <CollectionList collections={collections} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

function mapStateToProps({ auth, collections }) {
  return { _id: auth._id, collections: collections.collectionList };
}

export default connect(mapStateToProps, { getUserCollections })(Recipes);
