import React from 'react';

function Search({ value, onChange, placeholder }) {
  return (
    <div className="right menu">
      <div className="item">
        <div className="ui transparent icon input">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          <i className="search link icon"></i>
        </div>
      </div>
    </div>
  );
}

export default Search;
