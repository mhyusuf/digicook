// import '@types/jest';
import { 
  DELETE_RECIPE,
  GET_COLLECTION_DETAIL,
  GET_COLLECTION_LIST,
  GET_RECIPE,
  GET_RECIPE_LIST,
  DELETE_COLLECTION
} from '../../actions/types';
import collectionReducer from '../collectionReducer';
import mockState from '../../mocks/mockState';

const initialState = {
  collectionList: [],
  collectionDetail: {},
  recipeList: [],
  recipe: {
    name: '',
    category: '',
    image: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: ''
  }
};

describe('Collection Reducer', () => {

  it('Should return default state', () => {
    
    const newState = collectionReducer(undefined, {});
    expect(newState).toEqual(initialState);

  });

  describe('It should uphold contracts', () => {

    it('Should uphold GET_RECIPE', () => {
      const newState = collectionReducer(undefined, {
        type: GET_RECIPE,
        payload: mockState.collections.recipe
      });
      expect(newState).toEqual({...initialState, recipe: mockState.collections.recipe});
    });

    it('Should uphold GET_RECIPE_LIST', () => {
      const newState = collectionReducer(undefined, {
        type: GET_RECIPE_LIST,
        payload: mockState.collections.recipeList
      });
      expect(newState).toEqual({...initialState, recipeList: mockState.collections.recipeList});
    });

    it('Should uphold DELETE_RECIPE', () => {
      const testState = {
        ...initialState,
        collectionDetail: {
          _recipes: ['5fb64ed5e8d419ff602cd0c5']
        }
      }
      const newState = collectionReducer(testState, {
        type: DELETE_RECIPE,
        payload: '5fb64ed5e8d419ff602cd0c5'
      });
      expect(newState).toEqual({...testState,
        collectionDetail: {
          ...testState.collectionDetail,
          _recipes: testState.collectionDetail._recipes.filter(
            i => testState.collectionDetail._recipes[i] !== '5fb64ed5e8d419ff602cd0c5'
          )
        }});
    });

    it('Should uphold GET_COLLECTION_DETAIL', () => {
      const newState = collectionReducer(undefined, {
        type: GET_COLLECTION_DETAIL,
        payload: mockState.collections.collectionDetail
      });
      expect(newState).toEqual({...initialState, collectionDetail: mockState.collections.collectionDetail});
    });

    it('Should uphold GET_COLLECTION_LIST', () => {
      const newState = collectionReducer(undefined, {
        type: GET_COLLECTION_LIST,
        payload: mockState.collections.collectionList
      });
      expect(newState).toEqual({...initialState, collectionList: mockState.collections.collectionList});
    });

    it('Should uphold DELETE_COLLECTION', () => {
      const newState = collectionReducer(undefined, {
        type: DELETE_COLLECTION,
        payload: '5fb64e5de8d419ff602cd0c4'
      });
      expect(newState).toEqual({
        ...initialState,
        collectionList: mockState.collections.collectionList.filter(
          ({ _id }) => _id !== '5fb64e5de8d419ff602cd0c4'
      )});
    });

  });

});