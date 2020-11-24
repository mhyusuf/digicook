import React, { ChangeEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SearchProps {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
}

function Search({ value, onChange, placeholder }: SearchProps) {
  return (
    <div data-test="SearchComponent" className="right menu">
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
