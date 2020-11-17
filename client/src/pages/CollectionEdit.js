import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CollectionForm from '../containers/CollectionForm';
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
    image: '',
    isPrivate: collection.isPrivate
  };

  return (
    <>
      <div className="ui top attached tabular menu CollectionEdit__header">
        <div className="item active">Edit collection</div>
        <div className="right menu">
          <div className="item">
            <Link className="ui button" to="/collections/user">
              <i className="angle left icon"></i>
              Back to My Collections
            </Link>
          </div>
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
