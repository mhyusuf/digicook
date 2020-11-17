import React from 'react';

function Search({ value, onChange, attached, placeholder }) {
  return attached ? (
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
  ) : (
    <div className="ui search">
      <div className="ui input icon">
        <input className="prompt" value={value} onChange={onChange} />
        <i className="search icon"></i>
      </div>
    </div>
  );
}

export default Search;
