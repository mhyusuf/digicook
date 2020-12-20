import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../actions';
import { IUser } from '../interfaces/model';
import { IState } from '../interfaces/state';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

interface AppProps {
  user?: IUser;
  getUser: () => void;
}

const App: FunctionComponent<AppProps> = (props) => {
  const { user, getUser } = props;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

function mapStateToProps(state: IState) {
  return { user: state.auth };
}

export default connect(mapStateToProps, { getUser })(App);
