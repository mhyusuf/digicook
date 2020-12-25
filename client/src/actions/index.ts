import axios from 'axios';
import { Dispatch } from 'redux';
import { DigiCookAction } from '../interfaces/model';

import { DELETE_COLLECTION, DELETE_RECIPE } from './types';

export const deleteCollection = (_id: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  await axios.delete(`/api/collections/${_id}`);
  dispatch({ type: DELETE_COLLECTION, payload: _id });
};

export const deleteRecipe = (_id: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  await axios.delete(`/api/recipes/${_id}`);
  dispatch({ type: DELETE_RECIPE, payload: _id });
};

const actions = {
  deleteCollection,
  deleteRecipe,
};

export default actions;
