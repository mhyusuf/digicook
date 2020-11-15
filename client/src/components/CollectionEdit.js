import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CollectionForm from './CollectionForm';
import { getCollectionDetail, editCollection } from '../actions';

function CollectionEdit({
  collection,
  getCollectionDetail,
  editCollection,
  match
}) {
  useEffect(() => {
    getCollectionDetail(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    name: collection.name,
    description: collection.description,
    image: ''
  };

  return (
    <>
      <div className="ui top attached header CollectionEdit__header">
        Edit collection
        <div>
          <Link className="ui button" to="/my-collections">
            <i className="angle left icon"></i>
            Back to My Collections
          </Link>
        </div>
      </div>
      <div className="ui attached segment">
        {collection._id ? (
          <CollectionForm
            initialState={initialState}
            submitHandler={(...args) => editCollection(collection._id, ...args)}
          />
        ) : (
          'Loading'
        )}
      </div>
    </>
  );
}

function mapStateToProps({ collections }) {
  return { collection: collections.collectionDetail };
}

export default connect(mapStateToProps, {
  getCollectionDetail,
  editCollection
})(CollectionEdit);
