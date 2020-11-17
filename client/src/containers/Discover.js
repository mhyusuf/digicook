import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getPublicCollections, getPublicRecipes } from '../actions';
import DiscoverCollections from './DiscoverCollections';
import DiscoverRecipes from './DiscoverRecipes';
import Search from '../components/Search';

function Discover({
  collections,
  recipes,
  getPublicCollections,
  getPublicRecipes
}) {
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
          attached
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

function mapStateToProps({ collections }) {
  return {
    collections: collections.collectionList,
    recipes: collections.recipeList
  };
}

export default connect(mapStateToProps, {
  getPublicCollections,
  getPublicRecipes
})(Discover);
