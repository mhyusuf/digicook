import {
  DELETE_RECIPE,
  GET_COLLECTION_DETAIL,
  GET_COLLECTION_LIST,
  GET_RECIPE,
  DELETE_COLLECTION
} from '../actions/types';

const initialState = {
  collectionList: [],
  collectionDetail: {},
  recipe: {
    name: '',
    category: '',
    image: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: ''
  }
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION_LIST:
      return { ...state, collectionList: action.payload };
    case GET_COLLECTION_DETAIL:
      return { ...state, collectionDetail: action.payload };
    case DELETE_COLLECTION:
      return {
        ...state,
        collectionList: state.collectionList.filter(
          ({ _id }) => _id !== action.payload
        )
      };
    case GET_RECIPE:
      return { ...state, recipe: action.payload };
    case DELETE_RECIPE:
      return {
        ...state,
        collectionDetail: {
          ...state.collectionDetail,
          _recipes: state.collectionDetail._recipes.filter(
            ({ _id }) => _id !== action.payload
          )
        }
      };
    default:
      return state;
  }
};

export default collectionReducer;
