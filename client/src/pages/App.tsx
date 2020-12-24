import React, { FunctionComponent, useEffect, useState } from 'react';

import { getCurrentUser } from '../services/apiService';
import { User } from '../interfaces/user';
import { UserContext } from '../context/user';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App: FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);
  return (
    <UserContext.Provider value={currentUser}>
      {currentUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </UserContext.Provider>
  );
};

export default App;
