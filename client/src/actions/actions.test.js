// import '@types/jest';
import moxios from 'moxios';
import util from '../util';
import actions from '.';

describe('GetPublicCollections', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is correctly updated', () => {

    const expectedState = [{
          isPrivate: false,
          _recipes: [],
          _id: 'qwertyuiop',
          name: 'Sample Collection 1',
          _user: {},
          description: 'Sample Collection 1 description',
          __v: 0,
          image: {}
        },{
          isPrivate: false,
          _recipes: [],
          _id: 'asdfghjkl',
          name: 'Sample Collection 2',
          _user: {},
          description: 'Sample Collection 2 description',
          __v: 0,
          image: {}
        }];
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
      })

  });

});
