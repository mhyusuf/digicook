import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../actions';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App({ user, getUser }) {
  // When user enters page
  useEffect(() => {
    getUser(); // Try to get user obj (check if user is logged in)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />; // Render logged in / logged out version of app if user exists or not
}

// 
function mapStateToProps(state) {
  return { user: state.auth }; // Get user object from global state
}

export default connect(mapStateToProps, { getUser })(App); // Make user obj and getUser avalible as props
