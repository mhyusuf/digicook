import React, { useState, useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, match } from 'react-router-dom';

import { getCollectionDetail } from '../actions';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';
import { CollectionDetailCollection } from '../interfaces/model';

interface MatchInterface {
  id: string;
}

interface CollectionDetailProps extends RouteComponentProps {
  collection: CollectionDetailCollection;
  getCollectionDetail: (id: string, query?: string) => void;
  match: match<MatchInterface>;
}

const CollectionDetail: FunctionComponent<CollectionDetailProps> = (props) => {
  const { match, collection, getCollectionDetail, history } = props;
  const [query, setQuery] = useState('');
  useEffect(() => {
    getCollectionDetail(match.params.id, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return collection ? (
    <div>
      <div className="ui attached tabular menu CollectionDetail__header">
        <div className="item active">{collection.name}</div>
        <div className="right menu">
          <Search
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder={`Search ${collection.name}`}
          />
          <div className="item">
            <button className="ui button" onClick={() => history.goBack()}>
              <i className="angle left icon"></i>Go back
            </button>
          </div>
        </div>
      </div>
      <RecipeList recipes={collection._recipes} />
    </div>
  ) : (
    <p>'Loading'</p>
  );
};

function mapStateToProps({
  collections
}: {
  collections: { collectionDetail: CollectionDetailCollection };
}) {
  return { collection: collections.collectionDetail };
}

export default connect(mapStateToProps, { getCollectionDetail })(
  CollectionDetail
);
