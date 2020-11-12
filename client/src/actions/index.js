import axios from 'axios';

import { GET_USER } from './types';

export const getUser = () => async (dispatch) => {
  const { data }= await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};