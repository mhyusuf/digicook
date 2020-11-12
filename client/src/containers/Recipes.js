import React from 'react';
import { Link } from 'react-router-dom';

function Recipes() {
  return (
    <div>
      <h1>Collections</h1>
      <Link to="/my-recipes/create-collection">Add collection</Link>
    </div>
  );
};

export default Recipes;