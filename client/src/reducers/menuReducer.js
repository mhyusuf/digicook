import { SHOW_MENU, HIDE_MENU } from '../actions/types';

const menuReducer = (state = false, action) => {
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
