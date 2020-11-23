import reducers from '../reducers';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

const findByDataTest = (component: any, attr:string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

const testStore = (initialState: any) => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  return createStoreWithMiddleware(reducers, initialState);
};


const util = {
  findByDataTest,
  testStore,
};

export default util;
