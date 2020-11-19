import { GET_USER } from '../actions/types';


// Reducers are functions which modify the store state, and are passed as an argument when initializing the store
// This checks whether a user was passed in the payload and otherwise returns false
// It corresponds to the function in '../actions/index.js'
const authReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
