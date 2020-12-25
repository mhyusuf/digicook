import React, { FunctionComponent } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@apollo/client';
import { Link, match, RouteComponentProps } from 'react-router-dom';

import { GET_COLLECTION_BY_ID } from '../services/queryService';
import { UPDATE_COLLECTION } from '../services/mutationService';
import { Collection } from '../interfaces/collection';
import CollectionForm from '../containers/CollectionForm';

interface CollectionData {
  getCollectionById: Collection;
}

interface Params {
  id: string;
}

interface CollectionEditProps extends RouteComponentProps {
  match: match<Params>;
}

const CollectionEdit: FunctionComponent<CollectionEditProps> = (props) => {
  const { match, history } = props;

  const { loading, data } = useQuery<CollectionData>(GET_COLLECTION_BY_ID, {
    variables: { _id: match.params.id },
  });

  const [updateCollection] = useMutation<{ updateCollection: Collection }>(
    UPDATE_COLLECTION,
  );

  const collection = data?.getCollectionById;
  const initialState = {
    name: collection?.name || '',
    description: collection?.description || '',
    image: '',
    isPrivate: collection?.isPrivate || false,
  };

  return (
    <>
      <div className="ui top attached tabular menu CollectionEdit__header">
        <div className="item active">Edit collection</div>
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
        {collection ? (
          <CollectionForm
            initialState={initialState}
            submitHandler={async (updates) => {
              const { name, description, isPrivate, imageData } = updates;
              await updateCollection({
                variables: {
                  _id: match.params.id,
                  name,
                  description,
                  isPrivate,
                },
              });
              if (imageData && imageData.get('image')) {
                await axios.post(`/api/collections/${match.params.id}/image`);
              }
              history.push('/user');
            }}
          />
        ) : (
          <p>'Loading'</p>
        )}
      </div>
    </>
  );
};

export default CollectionEdit;
