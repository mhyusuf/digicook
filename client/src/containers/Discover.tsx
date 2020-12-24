import React, { useState, FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';

import {
  GET_PUBLIC_COLLECTIONS,
  GET_PUBLIC_RECIPES,
} from '../services/queryService';
import { Collection } from '../interfaces/collection';
import { Recipe } from '../interfaces/recipe';
import DiscoverCollections from './DiscoverCollections';
import DiscoverRecipes from './DiscoverRecipes';
import Search from '../components/Search';

interface CollectionData {
  getPublicCollections: Collection[];
}

interface RecipeData {
  getPublicRecipes: Recipe[];
}

const Discover: FunctionComponent = () => {
  const [renderCollections, setRenderCollections] = useState(true);
  const [query, setQuery] = useState('');

  const colQuery = useQuery<CollectionData>(GET_PUBLIC_COLLECTIONS, {
    variables: { query },
    skip: !renderCollections,
  });
  const recQuery = useQuery<RecipeData>(GET_PUBLIC_RECIPES, {
    variables: { query },
    skip: renderCollections,
  });
  return (
    <>
      <div className="ui top attached tabular menu Discover__header">
        <div
          className={`item ${renderCollections ? 'active' : ''}`}
          onClick={() => setRenderCollections(true)}
        >
          Collections
        </div>
        <div
          className={`item ${!renderCollections ? 'active' : ''}`}
          onClick={() => setRenderCollections(false)}
        >
          Recipes
        </div>
        <Search
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder={`Search ${
            renderCollections ? 'collections' : 'recipes'
          }`}
        />
      </div>
      <div className="ui bottom attached segment">
        {renderCollections ? (
          <DiscoverCollections
            collections={colQuery.data?.getPublicCollections || []}
          />
        ) : (
          <DiscoverRecipes recipes={recQuery.data?.getPublicRecipes || []} />
        )}
      </div>
    </>
  );
};

export default Discover;
