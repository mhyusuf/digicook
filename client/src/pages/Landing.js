import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { hideMenu } from '../actions';
import Discover from '../containers/Discover';

function Landing({ hideMenu }) {
  useEffect(() => {
    hideMenu();
  });
  return (
    <div>
      <Discover />
    </div>
  );
}

export default connect(null, { hideMenu })(Landing);
