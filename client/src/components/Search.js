import React from 'react';

function Search({ value, onChange }) {
  return (
    <div className="ui search">
      <div className="ui input icon">
        <input className="prompt" value={value} onChange={onChange} />
        <i className="search icon"></i>
      </div>
    </div>
  );
}

export default Search;
