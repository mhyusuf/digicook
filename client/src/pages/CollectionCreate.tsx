import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';

import { ICollectionValues } from '../interfaces/inputs';
import CollectionForm from '../containers/CollectionForm';
import { createCollection } from '../actions';

interface CollectionCreateProps {
  createCollection: (x: ICollectionValues, y: History<any>) => void;
}

const CollectionCreate: FunctionComponent<CollectionCreateProps> = (props) => {
  const { createCollection } = props;
  const initialState: ICollectionValues = {
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
};

export default connect(null, { createCollection })(CollectionCreate);
