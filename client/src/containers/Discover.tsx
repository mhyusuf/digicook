import React, { useState, useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { getPublicCollections, getPublicRecipes } from '../actions';
import { ICollectionWithUserObj, IRecipe } from '../interfaces/model';
import DiscoverCollections from './DiscoverCollections';
import DiscoverRecipes from './DiscoverRecipes';
import Search from '../components/Search';

interface DiscoverProps {
  collections: ICollectionWithUserObj[];
  recipes: IRecipe[];
  getPublicCollections: (query?: string) => void;
  getPublicRecipes: (query?: string) => void;
}
// Deconstruct states and methods as props
const Discover: FunctionComponent<DiscoverProps> = (props) => {
  const {
    collections,
    recipes,
    getPublicCollections,
    getPublicRecipes,
  } = props;
  const [renderCollections, setRenderCollections] = useState(true);
  const [query, setQuery] = useState('');
  useEffect(() => {
    renderCollections ? getPublicCollections(query) : getPublicRecipes(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCollections, query]);

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
          <DiscoverCollections collections={collections} />
        ) : (
          <DiscoverRecipes recipes={recipes} />
        )}
      </div>
    </>
  );
};

// Get states from the global state
function mapStateToProps({
  collections,
}: {
  collections: {
    collectionList: ICollectionWithUserObj[];
    recipeList: IRecipe[];
  };
}) {
  return {
    collections: collections.collectionList,
    recipes: collections.recipeList,
  };
}

// Makes selected states and methods (collections, recipes) avalible as props
export default connect(mapStateToProps, {
  getPublicCollections,
  getPublicRecipes,
})(Discover);
