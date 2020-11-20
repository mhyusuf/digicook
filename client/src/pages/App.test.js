// import '@types/jest';
import App from './App';
import enzyme from 'enzyme';
import configureStore from 'redux-mock-store';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import NavbarLink from '../components/NavbarLink';

import { shallowUntilTarget } from '../mocks/helper';
import {fakeAuthedUser, fakeUnauthedUser} from '../mocks/mockUsers';

const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({adapter: new Adapter() });

let store, container;

describe('Display correct Nav links, based on user auth', ()=> {
  const mockStore = configureStore();  
  
  it('App renders AuthenticatedApp if user is logged in', () => {
    store = mockStore(fakeAuthedUser)
    container = shallowUntilTarget(<App store={store} />, AuthenticatedApp)
    expect(container.containsMatchingElement(<NavbarLink text="My Recipes" to="/user" />)).toEqual(true);
  })

  it('App renders UnauthenticatedApp if user is logged out', () => {
    store = mockStore(fakeUnauthedUser)
    container = shallowUntilTarget(<App store={store} />, UnauthenticatedApp)
    expect(container.containsMatchingElement(<NavbarLink text="My Recipes" to="/user" />)).toEqual(false);
  })


});

