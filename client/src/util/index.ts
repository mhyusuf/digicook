import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';
import { IState } from '../interfaces/state';

const findByDataTest = (component: any, attr: string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

const testStore = (initialState: IState) => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  return createStoreWithMiddleware(reducers, initialState);
};

const util = {
  findByDataTest,
  testStore
};

export default util;
