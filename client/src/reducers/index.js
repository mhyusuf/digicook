import { combineReducers } from 'redux';
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';

export default combineReducers({
  auth: authReducer,
  collections: collectionReducer
});
