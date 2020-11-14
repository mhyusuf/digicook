import {
  GET_COLLECTION_DETAIL,
  GET_COLLECTION_LIST,
  GET_RECIPE
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
    case GET_RECIPE:
      return { ...state, recipe: action.payload };
    default:
      return state;
  }
};

export default collectionReducer;
