import React from 'react';

function Loader() {
  return (
    <div className="ui segment Loader">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );
}

export default Loader;
