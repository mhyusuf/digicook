import React, { FunctionComponent } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { Link, RouteComponentProps } from 'react-router-dom';

import { CREATE_COLLECTION } from '../services/mutationService';
import { Collection } from '../interfaces/collection';
import { CollectionValues } from '../interfaces/inputs';
import CollectionForm from '../containers/CollectionForm';

const CollectionCreate: FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [createCollection] = useMutation<{ createCollection: Collection }>(
    CREATE_COLLECTION,
  );

  async function handleSubmit(values: CollectionValues) {
    const { name, description, isPrivate, imageData } = values;
    const res = await createCollection({
      variables: { name, description, isPrivate },
    });
    const { _id } = res.data!.createCollection;
    await axios.post(`/api/collections/${_id}/image`, imageData);
    history.push('/user');
  }
  const initialState = {
    name: '',
    description: '',
    image: '',
    isPrivate: false,
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
          submitHandler={handleSubmit}
        />
      </div>
    </>
  );
};

export default CollectionCreate;
