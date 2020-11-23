import React, { ChangeEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface SearchProps extends RouteComponentProps {
  value: string;
  onChange: () => ChangeEventHandler<string>;
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
