import React, { ChangeEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function Search({ value, onChange, placeholder }: SearchProps) {
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
