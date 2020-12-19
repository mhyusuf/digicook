/* Import relevant modules inc. Redux */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/* Import components and css */
import App from './pages/App';
import reducers from './reducers';
import './styles/styles.scss';

/* Create global state (storage) using Redux */
const store = createStore(
  reducers, // TO DO
  composeWithDevTools(applyMiddleware(reduxThunk)), // TO DO
);

/* Render app component and make Redux global state avalible in all sub-components */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
