import { Schema } from 'mongoose';
import {
  DELETE_RECIPE,
  GET_COLLECTION_DETAIL,
  GET_COLLECTION_LIST,
  GET_RECIPE,
  GET_RECIPE_LIST,
  DELETE_COLLECTION
} from '../actions/types';
import { DigiCookAction } from '../interfaces/model';

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

// Reducers are functions which modify the store state, and are passed as an argument when initializing the store
// These reducers correspond to the functions in '../actions/index.js'
const collectionReducer = (
  state: any = initialState,
  action: DigiCookAction
) => {
  switch (action.type) {
    case GET_COLLECTION_LIST:
      return { ...state, collectionList: action.payload };
    case GET_COLLECTION_DETAIL:
      return { ...state, collectionDetail: action.payload };
    case DELETE_COLLECTION:
      return {
        ...state,
        collectionList: state.collectionList.filter(
          ({ _id }: { _id: Schema.Types.ObjectId }) => _id !== action.payload
        )
      };
    case GET_RECIPE_LIST:
      return { ...state, recipeList: action.payload };
    case GET_RECIPE:
      return { ...state, recipe: action.payload };
    case DELETE_RECIPE:
      return {
        ...state,
        collectionDetail: {
          ...state.collectionDetail,
          _recipes: state.collectionDetail._recipes.filter(
            ({ _id }: { _id: Schema.Types.ObjectId }) => _id !== action.payload
          )
        }
      };
    default:
      return state;
  }
};

export default collectionReducer;
