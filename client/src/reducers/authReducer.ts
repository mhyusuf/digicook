import { DigiCookAction } from '../interfaces/model';
import { GET_USER } from '../actions/types';

const authReducer = (state = null, action: DigiCookAction) => {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
