import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserCollections, showMenu } from '../actions';
import CollectionList from '../containers/CollectionList';
import Search from '../components/Search';
import { MyCollectionsCollection, IUser } from '../interfaces/model';

interface MyCollectionsProps {
  _id: string;
  collections: MyCollectionsCollection[];
  getUserCollections: (id: string, query: string) => void;
  showMenu: () => void;
}

const MyCollections: FunctionComponent<MyCollectionsProps> = (props) => {
  const { _id, collections, getUserCollections, showMenu } = props;
  const [query, setQuery] = useState('');
  useEffect(() => {
    getUserCollections(_id, query);
    showMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="Recipes">
      <div className="ui top attached tabular menu Recipes__header">
        <div className="item active">My collections</div>
        <div className="right menu">
          <Search
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Search my collections"
          />
          <div className="item">
            <Link className="ui button" to="/create-collection">
              <i className="add icon"></i>
              Add collection
            </Link>
          </div>
        </div>
      </div>
      {collections.length ? (
        <div className="ui attached segment Recipes__content">
          <CollectionList collections={collections} />
        </div>
      ) : (
        <div className="ui visible message not-found">
          <p>No collections found</p>
        </div>
      )}
    </div>
  );
};

function mapStateToProps({
  auth,
  collections,
}: {
  auth: IUser;
  collections: { collectionList: MyCollectionsCollection[] };
}) {
  return { _id: auth._id.toString(), collections: collections.collectionList };
}

export default connect(mapStateToProps, { getUserCollections, showMenu })(
  MyCollections,
);
