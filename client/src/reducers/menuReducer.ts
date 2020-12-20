import { SHOW_MENU, HIDE_MENU } from '../actions/types';
import { DigiCookAction } from '../interfaces/model';

const menuReducer = (state = false, action: DigiCookAction) => {
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
