import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CollectionForm from '../containers/CollectionForm';
import { createCollection } from '../actions';

function CollectionCreate({ createCollection }) {
  const initialState = {
    name: '',
    description: '',
    image: '',
    isPrivate: false
  };

  return (
    <>
      <div className="ui top attached tabular menu CollectionCreate__header">
        <div className="item active">Create collection</div>
        <div className="right menu">
          <div className="item">
            <Link className="ui button" to="/user">
              <i className="angle left icon"></i>
              Back to My Collections
            </Link>
          </div>
        </div>
      </div>
      <div className="ui attached segment">
        <CollectionForm
          initialState={initialState}
          submitHandler={createCollection}
        />
      </div>
    </>
  );
}

export default connect(null, { createCollection })(CollectionCreate);
