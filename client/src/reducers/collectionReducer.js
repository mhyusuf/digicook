import { GET_COLLECTION_DETAIL, GET_COLLECTION_LIST } from '../actions/types';

const initialState = {
  collectionList: [],
  collectionDetail: {}
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION_LIST:
      return { ...state, collectionList: action.payload };
    case GET_COLLECTION_DETAIL:
      return { ...state, collectionDetail: action.payload };
    default:
      return state;
  }
};

export default collectionReducer;
