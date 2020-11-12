import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../actions'
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App({ user, getUser }) {
  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

function mapStateToProps(state) {
  return  { user: state.auth }
}

export default connect(mapStateToProps, { getUser })(App);
