import React, { useState, FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps, match } from 'react-router-dom';

import {
  GET_COLLECTION_BY_ID,
  GET_RECIPES_BY_COLLECTION,
} from '../services/queryService';
import { Collection } from '../interfaces/collection';
import { Recipe } from '../interfaces/recipe';
import RecipeList from '../containers/RecipeList';
import Search from '../components/Search';

interface CollectionData {
  getCollectionById: Collection;
}

interface RecipeData {
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

  const colQuery = useQuery<CollectionData>(GET_COLLECTION_BY_ID, {
    variables: { _id: match.params.id },
  });
  const recQuery = useQuery<RecipeData>(GET_RECIPES_BY_COLLECTION, {
    variables: { _collection: match.params.id, query },
  });

  const collection = colQuery.data?.getCollectionById;
  const recipes = recQuery.data?.getRecipesByCollection || [];

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
