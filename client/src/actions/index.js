import axios from 'axios';

import { GET_USER, CREATE_COLLECTION } from './types';

export const getUser = () => async (dispatch) => {
  const { data } = await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};

export const createCollection = (values, history) => async (dispatch) => {
  const { name, description, imageData } = values;
  const collectionRes = await axios.post('/api/collections', { name, description });
  const collectionId = collectionRes.data._id;
  await axios.post(`/api/collections/${collectionId}/image`, imageData);
}