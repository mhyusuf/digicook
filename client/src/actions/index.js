import axios from 'axios';

import { GET_USER, GET_COLLECTIONS } from './types';

export const getUser = () => async (dispatch) => {
  const { data } = await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};

export const getUserCollections = (_id) => async (dispatch) => {
  const { data } = await axios.get(`/api/collections?user=${_id}`);
  dispatch({ type: GET_COLLECTIONS, payload: data });
}

export const createCollection = (values, history) => async (dispatch) => {
  const { name, description, imageData } = values;
  const collectionRes = await axios.post('/api/collections', { name, description });
  const collectionId = collectionRes.data._id;
  await axios.post(`/api/collections/${collectionId}/image`, imageData);
  history.push('/my-collections');
};

export const createRecipe = (values, history) => async (dispatch) => {
  const { name, category, instructions, imageData, ingedients, collection } = values;
  const recipeRes = await axios.post('/api/recipes', { name, category, instructions, ingedients, collection });
  const recipeId = recipeRes.data._id;
  await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  history.push('/my-collections');
};