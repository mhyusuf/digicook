import axios from 'axios';
import { History } from 'history';
import { Dispatch } from 'redux';
import { DigiCookAction } from '../interfaces/model';
import { ICollectionValues, IRecipeValues } from '../interfaces/inputs';

import {
  GET_USER,
  GET_COLLECTION_LIST,
  GET_COLLECTION_DETAIL,
  DELETE_COLLECTION,
  GET_RECIPE,
  GET_RECIPE_LIST,
  DELETE_RECIPE,
} from './types';

export const getUser = () => async (dispatch: Dispatch<DigiCookAction>) => {
  const { data } = await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};

export const getPublicCollections = (query?: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(`/api/collections?pub=true${queryString}`);
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

export const getUserCollections = (_id: string, query?: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(
    `/api/collections?user=${_id}${queryString}`,
  );
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

export const createCollection = (
  values: ICollectionValues,
  history: History<any>,
) => async (dispatch: Dispatch<DigiCookAction>) => {
  const { name, description, isPrivate, imageData } = values;
  const collectionRes = await axios.post('/api/collections', {
    name,
    description,
    isPrivate,
  });
  const collectionId = collectionRes.data._id;
  await axios.post(`/api/collections/${collectionId}/image`, imageData);
  history.push('/user');
};

export const editCollection = (
  _id: string,
  updates: ICollectionValues,
  history: History<any>,
) => async (dispatch: Dispatch<DigiCookAction>) => {
  const { name, description, isPrivate, imageData } = updates;
  await axios.put(`/api/collections/${_id}`, { name, description, isPrivate });
  if (imageData && imageData.get('image')) {
    await axios.post(`/api/collections/${_id}/image`);
  }
  history.goBack();
};

export const deleteCollection = (_id: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  await axios.delete(`/api/collections/${_id}`);
  dispatch({ type: DELETE_COLLECTION, payload: _id });
};

export const getCollectionDetail = (_id: string, query?: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  const queryString = query ? `?q=${query}` : '';
  const { data } = await axios.get(`/api/collections/${_id}${queryString}`);
  dispatch({ type: GET_COLLECTION_DETAIL, payload: data });
};

export const createRecipe = (
  values: IRecipeValues,
  history: History<any>,
) => async (dispatch: Dispatch<DigiCookAction>) => {
  const {
    name,
    category,
    instructions,
    imageData,
    ingredients,
    collection,
  } = values;
  const recipeRes = await axios.post('/api/recipes', {
    name,
    category,
    instructions,
    ingredients,
    collection,
  });
  const recipeId = recipeRes.data._id;
  await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  history.push('/user');
};

export const getRecipe = (_id: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  const { data } = await axios.get(`/api/recipes/${_id}`);
  dispatch({ type: GET_RECIPE, payload: data });
};

export const getPublicRecipes = (query?: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(`/api/recipes?pub=true${queryString}`);
  dispatch({ type: GET_RECIPE_LIST, payload: data });
};

export const editRecipe = (
  _id: string,
  updates: IRecipeValues,
  history: History<any>,
) => async (dispatch: Dispatch<DigiCookAction>) => {
  const {
    name,
    category,
    instructions,
    imageData,
    ingredients,
    collection,
  } = updates;
  const recipeRes = await axios.put(`/api/recipes/${_id}`, {
    name,
    category,
    instructions,
    ingredients,
    collection,
  });
  if (imageData && imageData.get('image')) {
    const recipeId = recipeRes.data._id;
    await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  }
  history.goBack();
};

export const deleteRecipe = (_id: string) => async (
  dispatch: Dispatch<DigiCookAction>,
) => {
  await axios.delete(`/api/recipes/${_id}`);
  dispatch({ type: DELETE_RECIPE, payload: _id });
};

const actions = {
  getUser,
  getPublicCollections,
  getUserCollections,
  createCollection,
  editCollection,
  deleteCollection,
  getCollectionDetail,
  createRecipe,
  getRecipe,
  getPublicRecipes,
  editRecipe,
  deleteRecipe,
};

export default actions;
