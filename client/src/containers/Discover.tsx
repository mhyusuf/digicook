import React, { useState, useEffect, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { getPublicCollections, getPublicRecipes } from '../actions';
import DiscoverCollections from './DiscoverCollections';
import DiscoverRecipes from './DiscoverRecipes';
import Search from '../components/Search';

// Deconstruct states and methods as props
function Discover({
  collections,
  recipes,
  getPublicCollections,
  getPublicRecipes
}: any) {
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
          onChange={(e: any) => setQuery(e.target.value)}
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
}

// Get states from the global state
function mapStateToProps(state: any) {
  return {
    collections: state.collections.collectionList,
    recipes: state.collections.recipeList
  };
}

// Makes selected states and methods (collections, recipes) avalible as props
export default connect(mapStateToProps, {
  getPublicCollections,
  getPublicRecipes
})(Discover);
