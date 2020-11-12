import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../actions'
import AuthenticatedApp from '../AuthenticatedApp';
import UnauthenticatedApp from '../UnauthenticatedApp';
import './App.css';

function App() {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
