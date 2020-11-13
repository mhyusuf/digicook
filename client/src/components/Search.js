import React from 'react';

function Search() {
  return (
    <div className="Search">
      <i className="Search__icon fas fa-search"></i>
      <input className="Search__input" type="text" />
      <i className="Search__clear fas fa-times-circle"></i>
    </div>
  );
}

export default Search;
