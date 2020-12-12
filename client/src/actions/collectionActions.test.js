// import '@types/jest';
import moxios from 'moxios';
import util from '../util';
import actions from '.';
import mockState from '../mocks/mockState';

describe('GetPublicCollections', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is correctly updated', () => {

    const expectedState = mockState.collections.collectionList;
    const store = util.testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(actions.getPublicCollections())
      .then(() => {
        const newState = store.getState();
        expect(newState.collections.collectionList).toBe(expectedState);
      });

  });

});
