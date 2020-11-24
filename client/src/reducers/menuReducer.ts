import { SHOW_MENU, HIDE_MENU } from '../actions/types';

// Reducers are functions which modify the store state, and are passed as an argument when initializing the store
// This reducer returns true or false depending on whether the action.type was 'SHOW' or 'HIDE' _MENU
const menuReducer = (state = false, action: any) => {
  switch (action.type) {
    case SHOW_MENU:
      return true;
    case HIDE_MENU:
      return false;
    default:
      return state;
  }
};

export default menuReducer;
