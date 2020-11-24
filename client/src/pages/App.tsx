import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from 'redux';
import { getUser } from '../actions';
import { IUser } from '../interfaces/model';
import { IState } from '../interfaces/state';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App ({ user, getUser }: {user?: IUser, getUser: () => void}) : JSX.Element {
  // When user enters page
  useEffect(() => {
    getUser(); // Try to get user obj (check if user is logged in)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />; // Render logged in / logged out version of app if user exists or not
}


function mapStateToProps(state: IState) {
  return { user: state.auth }; // Get user object from global state
}

export default connect(mapStateToProps, { getUser })(App); // Make user obj and getUser avalible as props
