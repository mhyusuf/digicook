import React from 'react';
import { connect } from 'react-redux';

import CollectionForm from './CollectionForm';
import { createCollection } from '../actions';

function CollectionCreate({ createCollection }) {
  const initialState = {
    name: '',
    description: '',
    image: ''
  };

  return (
    <>
      <h3 className="ui top attached header">Create collection</h3>
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
