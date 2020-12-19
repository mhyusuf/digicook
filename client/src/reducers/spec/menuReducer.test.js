// import '@types/jest';
import { SHOW_MENU, HIDE_MENU } from '../../actions/types';
import menuReducer from '../menuReducer';

describe('Menu Reducer', () => {
  it('Should return default state', () => {
    const newState = menuReducer(undefined, {});
    expect(newState).toEqual(false);
  });

  describe('It should uphold contracts', () => {
    it('Should uphold SHOW_MENU', () => {
      const newState = menuReducer(undefined, {
        type: SHOW_MENU,
        payload: false,
      });
      expect(newState).toEqual(true);
    });

    it('Should uphold HIDE_MENU', () => {
      const newState = menuReducer(undefined, {
        type: HIDE_MENU,
        payload: true,
      });
      expect(newState).toEqual(false);
    });
  });
});
