import { combineReducers } from 'redux';

import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import menuReducer from './menuReducer';

// Reducers are functions which modify the store state, and are passed as an argument when initializing the store
// This combines the separate reducers in other files into a single exported object
// That is passed to initialize the store in the main index.js

export default combineReducers({
  auth: authReducer,
  collections: collectionReducer,
  menus: menuReducer,
});
