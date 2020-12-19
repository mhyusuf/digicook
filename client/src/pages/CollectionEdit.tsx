import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, match, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import CollectionForm from '../containers/CollectionForm';
import { getCollectionDetail, editCollection } from '../actions';
import { CollectionDetailCollection } from '../interfaces/model';
import { ICollectionValues } from '../interfaces/inputs';

interface MatchInterface {
  id: string;
}

interface CollectionEditProps extends RouteComponentProps {
  collection: CollectionDetailCollection;
  getCollectionDetail: (_id: string, query?: string) => void;
  editCollection: (
    _id: string,
    updates: ICollectionValues,
    history: History<any>,
  ) => void;
  match: match<MatchInterface>;
}

const CollectionEdit: FunctionComponent<CollectionEditProps> = (props) => {
  const {
    collection,
    getCollectionDetail,
    editCollection,
    match,
    history,
  } = props;

  useEffect(() => {
    getCollectionDetail(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    name: collection.name,
    description: collection.description,
    image: '',
    isPrivate: collection.isPrivate,
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
        {collection._id ? (
          <CollectionForm
            initialState={initialState}
            submitHandler={(updates: ICollectionValues) =>
              editCollection(collection._id, updates, history)
            }
          />
        ) : (
          <p>'Loading'</p>
        )}
      </div>
    </>
  );
};

function mapStateToProps({
  collections,
}: {
  collections: { collectionDetail: CollectionDetailCollection };
}) {
  return { collection: collections.collectionDetail };
}

export default connect(mapStateToProps, {
  getCollectionDetail,
  editCollection,
})(CollectionEdit);
