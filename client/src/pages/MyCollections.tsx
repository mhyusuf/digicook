import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';

import { GET_USER_COLLECTIONS } from '../services/queryService';
import { Collection } from '../interfaces/collection';
import { showMenu } from '../actions';
import CollectionList from '../containers/CollectionList';
import Search from '../components/Search';

interface CollectionData {
  getUserCollections: Collection[];
}

interface MyCollectionsProps {
  showMenu: () => void;
}

const MyCollections: FunctionComponent<MyCollectionsProps> = (props) => {
  const { showMenu } = props;
  const [query, setQuery] = useState('');
  useEffect(() => {
    showMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, data } = useQuery<CollectionData>(GET_USER_COLLECTIONS, {
    variables: { query },
  });

  const collections = data?.getUserCollections;
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
      {collections ? (
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

export default connect(null, { showMenu })(MyCollections);
