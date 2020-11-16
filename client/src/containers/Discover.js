import React, { useState } from 'react';

import DiscoverCollections from './DiscoverCollections';
import DiscoverRecipes from './DiscoverRecipes';

function Discover() {
  const [renderCollections, setRenderCollections] = useState(true);

  return (
    <>
      <div className="ui top attached tabular menu">
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
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="ui bottom attached segment">
        {renderCollections ? <DiscoverCollections /> : <DiscoverRecipes />}
      </div>
    </>
  );
}

export default Discover;
