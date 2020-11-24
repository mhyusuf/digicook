import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { hideMenu } from '../actions';
import Discover from '../containers/Discover';

export function Landing({ hideMenu }: {hideMenu: ()=> void}) {
  useEffect(() => {
    hideMenu(); // Hide menu on load
  });
  return (
    <div>
      <Discover />
    </div>
  );
}

export default connect(null, { hideMenu })(Landing);
