// import '@types/jest';
import App from './App';
import configureStore from 'redux-mock-store';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import NavbarLink from '../components/NavbarLink';

import { shallowUntilTarget } from '../mocks/helper';
import { fakeAuthedState, fakeUnauthedState } from '../mocks/mockAuth';

describe('Display correct Nav links, based on user auth', () => {
  let store, container;
  const mockStore = configureStore();

  it('App renders AuthenticatedApp if user is logged in', () => {
    store = mockStore(fakeAuthedState);
    container = shallowUntilTarget(<App store={store} />, AuthenticatedApp);
    expect(
      container.containsMatchingElement(
        <NavbarLink text="My Recipes" to="/user" />,
      ),
    ).toEqual(true);
  });

  it('App renders UnauthenticatedApp if user is logged out', () => {
    store = mockStore(fakeUnauthedState);
    container = shallowUntilTarget(<App store={store} />, UnauthenticatedApp);
    expect(
      container.containsMatchingElement(
        <NavbarLink text="My Recipes" to="/user" />,
      ),
    ).toEqual(false);
  });
});
