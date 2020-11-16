import { combineReducers } from 'redux';
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  auth: authReducer,
  collections: collectionReducer,
  menus: menuReducer
});
