import React, { useState, FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps, match } from 'react-router-dom';

import { GET_COLLECTION_DETAIL } from '../services/queryService';
import { Collection } from '../interfaces/collection';
import { Recipe } from '../interfaces/recipe';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';

interface CollectionDetailData {
  getCollectionById: Collection;
  getRecipesByCollection: Recipe[];
}

interface Params {
  id: string;
}

interface CollectionDetailProps extends RouteComponentProps {
  match: match<Params>;
}

const CollectionDetail: FunctionComponent<CollectionDetailProps> = (props) => {
  const { match, history } = props;
  const [query, setQuery] = useState('');

  const { loading, data } = useQuery<CollectionDetailData>(
    GET_COLLECTION_DETAIL,
    {
      variables: { _collection: match.params.id, query },
      pollInterval: 500,
    },
  );

  const collection = data?.getCollectionById;
  const recipes = data?.getRecipesByCollection || [];

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
      <RecipeList recipes={recipes} />
    </div>
  ) : (
    <p>'Loading'</p>
  );
};

export default CollectionDetail;
