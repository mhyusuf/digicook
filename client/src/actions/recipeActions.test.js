// import '@types/jest';
import moxios from 'moxios';
import util from '../util';
import actions from '.';
import mockState from '../mocks/mockState';

describe('GetPublicRecipes', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = util.testStore();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is correctly updated', () => {
    const expectedState = mockState.collections.recipeList;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(actions.getPublicRecipes()).then(() => {
      const newState = store.getState();
      expect(newState.collections.recipeList).toBe(expectedState);
    });
  });
});

describe('GetRecipe', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = util.testStore();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is correctly updated', () => {
    const expectedState = mockState.collections.recipe;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store
      .dispatch(actions.getRecipe('5fb64ed5e8d419ff602cd0c5'))
      .then(() => {
        const newState = store.getState();
        expect(newState.collections.recipe).toBe(expectedState);
      });
  });
});
