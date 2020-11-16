import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CollectionForm from '../containers/CollectionForm';
import { createCollection } from '../actions';

function CollectionCreate({ createCollection }) {
  const initialState = {
    name: '',
    description: '',
    image: ''
  };

  return (
    <>
      <div className="ui top attached header CollectionCreate__header">
        Create collection
        <div>
          <Link className="ui button" to="/my-collections">
            <i className="angle left icon"></i>
            Back to My Collections
          </Link>
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
// export default CollectionCreate;
