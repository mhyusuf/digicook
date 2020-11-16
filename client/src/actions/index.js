import axios from 'axios';

import {
  GET_USER,
  GET_COLLECTION_LIST,
  GET_COLLECTION_DETAIL,
  DELETE_COLLECTION,
  GET_RECIPE,
  GET_RECIPE_LIST,
  DELETE_RECIPE,
  SHOW_MENU,
  HIDE_MENU
} from './types';

export const getUser = () => async (dispatch) => {
  const { data } = await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};

export const getPublicCollections = () => async (dispatch) => {
  const { data } = await axios.get('/api/collections?pub=true');
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

export const getUserCollections = (_id, query) => async (dispatch) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(
    `/api/collections?user=${_id}${queryString}`
  );
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

export const createCollection = (values, history) => async (dispatch) => {
  const { name, description, isPrivate, imageData } = values;
  const collectionRes = await axios.post('/api/collections', {
    name,
    description,
    isPrivate
  });
  const collectionId = collectionRes.data._id;
  await axios.post(`/api/collections/${collectionId}/image`, imageData);
  history.push('/my-collections');
};

export const editCollection = (_id, updates, history) => async (dispatch) => {
  const { name, description, isPrivate, imageData } = updates;
  await axios.put(`/api/collections/${_id}`, { name, description, isPrivate });
  if (imageData.get('image')) {
    await axios.post(`/api/collections/${_id}/image`);
  }
  history.goBack();
};

export const deleteCollection = (_id, history) => async (dispatch) => {
  await axios.delete(`/api/collections/${_id}`);
  dispatch({ type: DELETE_COLLECTION, payload: _id });
};

export const getCollectionDetail = (_id, query) => async (dispatch) => {
  const queryString = query ? `?q=${query}` : '';
  const { data } = await axios.get(`/api/collections/${_id}${queryString}`);
  dispatch({ type: GET_COLLECTION_DETAIL, payload: data });
};

export const createRecipe = (values, history) => async (dispatch) => {
  const {
    name,
    category,
    instructions,
    imageData,
    ingredients,
    collection
  } = values;
  const recipeRes = await axios.post('/api/recipes', {
    name,
    category,
    instructions,
    ingredients,
    collection
  });
  const recipeId = recipeRes.data._id;
  await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  history.push('/my-collections');
};

export const getRecipe = (_id) => async (dispatch) => {
  const { data } = await axios.get(`/api/recipes/${_id}`);
  dispatch({ type: GET_RECIPE, payload: data });
};

export const getPublicRecipes = () => async (dispatch) => {
  const { data } = await axios.get('/api/recipes?pub=true');
  dispatch({ type: GET_RECIPE_LIST, payload: data });
};

export const editRecipe = (_id, updates, history) => async (dispatch) => {
  const {
    name,
    category,
    instructions,
    imageData,
    ingredients,
    collection
  } = updates;
  const recipeRes = await axios.put(`/api/recipes/${_id}`, {
    name,
    category,
    instructions,
    ingredients,
    collection
  });
  if (imageData.get('image')) {
    const recipeId = recipeRes.data._id;
    await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  }
  history.goBack();
};

export const deleteRecipe = (_id, history) => async (dispatch) => {
  await axios.delete(`/api/recipes/${_id}`);
  dispatch({ type: DELETE_RECIPE, payload: _id });
};

export const showMenu = () => {
  return { type: SHOW_MENU, payload: true };
};

export const hideMenu = () => {
  return { type: HIDE_MENU, payload: false };
};
