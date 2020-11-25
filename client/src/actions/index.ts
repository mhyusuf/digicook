import axios from 'axios';
import { History } from 'history';
import { Dispatch } from 'redux';
import { DigiCookAction } from '../interfaces/model';

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

import { ICollectionValues, IRecipeValues } from '../interfaces/inputs';

// These actions, which leverage redux-thunk, return functions that will dispatch payloads to reducers
// The target function is encoded in the 'type' proprety of the return objects below
// Reducers are functions which modify the store state, and are passed as an argument when initializing the store

// Gets currently authenticated user by making a call to the server's authController
export const getUser = () => async (dispatch: Dispatch<DigiCookAction>) => {
  const { data } = await axios.get('/auth/current-user');
  dispatch({ type: GET_USER, payload: data });
};

// Sets the state of store's 'collectionList' to the return of a call to server's collectionController
// This controller call returns all public collections matching an optional query (string) parameter
export const getPublicCollections = (query?: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(`/api/collections?pub=true${queryString}`);
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

// Sets the state of store's 'collectionList' to the return of a call to server's collectionController
// This controller call returns all collections that match the passed userId and an optional query (string) parameter
export const getUserCollections = (_id: string, query?: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(
    `/api/collections?user=${_id}${queryString}`
  );
  dispatch({ type: GET_COLLECTION_LIST, payload: data });
};

// Requires authentication - passed through authMiddleware in route
// Creates a collection with the passed parameters by calling the collectionController
// As a second call, adds image to newly created collection
// Redirects to user page

export const createCollection = (values: ICollectionValues, history: History<any>) => async (dispatch: Dispatch<DigiCookAction>) => {
  const { name, description, isPrivate, imageData } = values;
  const collectionRes = await axios.post('/api/collections', {
    name,
    description,
    isPrivate
  });
  const collectionId = collectionRes.data._id;
  await axios.post(`/api/collections/${collectionId}/image`, imageData);
  history.push('/user');
};

// Requires authentication - passed through authMiddleware in route
// Updates collection in DB matching passed _id with passed parameters in 'update' obj
// Redirects to previous page in navigation history
export const editCollection = (_id: string, updates: ICollectionValues, history: History<any>) => async (dispatch: Dispatch<DigiCookAction>) => {
  const { name, description, isPrivate, imageData } = updates;
  await axios.put(`/api/collections/${_id}`, { name, description, isPrivate });
  if (imageData && imageData.get('image')) {
    await axios.post(`/api/collections/${_id}/image`);
  }
  history.goBack();
};

// Requires authentication - passed through authMiddleware in route
// Deletes collection in DB matching passed _id
// Filters collections in store to exclude any matching passed _id
export const deleteCollection = (_id: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  await axios.delete(`/api/collections/${_id}`);
  dispatch({ type: DELETE_COLLECTION, payload: _id });
};

// Sets store.collectionDetail to data returned from call to server's collectionController
// Controller method returns DB collection object populated with corresponding Recipe objects
export const getCollectionDetail = (_id: string, query?: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  const queryString = query ? `?q=${query}` : '';
  const { data } = await axios.get(`/api/collections/${_id}${queryString}`);
  dispatch({ type: GET_COLLECTION_DETAIL, payload: data });
};

// Requires authentication - passed through authMiddleware in route
// Creates a new Recipe through a call to the server's recipeController
// And a subsequent call to add the passed imageData to the new Recipe object
// Redirects to user page


export const createRecipe = (values: IRecipeValues, history: History<any>) => async (dispatch: Dispatch<DigiCookAction>) => {
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
  history.push('/user');
};

// Sets the store.recipe to the return of a call to the server's recipeController
// Controller method returns Recipe object from DB matching passed _id
export const getRecipe = (_id: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  const { data } = await axios.get(`/api/recipes/${_id}`);
  dispatch({ type: GET_RECIPE, payload: data });
};

// Sets the store.recipeList to the return of a call to the server's recipeController
// Controller method returns an array of (public) Recipe objects matching the optional query (string) argument
export const getPublicRecipes = (query?: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  const queryString = query ? `&q=${query}` : '';
  const { data } = await axios.get(`/api/recipes?pub=true${queryString}`);
  dispatch({ type: GET_RECIPE_LIST, payload: data });
};

// Edits the Recipe object by a call to the recipeController
// And potentially a second call to an image-exclusive route to update the image
export const editRecipe = (_id: string, updates: IRecipeValues, history: History<any>) => async (dispatch: Dispatch<DigiCookAction>) => {
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
  if (imageData && imageData.get('image')) {
    const recipeId = recipeRes.data._id;
    await axios.post(`/api/recipes/${recipeId}/image`, imageData);
  }
  history.goBack();
};

// Deletes recipe in DB matching passed _id
// Filters recipes in store.collectionDetail to exclude any matching passed _id
export const deleteRecipe = (_id: string) => async (dispatch: Dispatch<DigiCookAction>) => {
  await axios.delete(`/api/recipes/${_id}`);
  dispatch({ type: DELETE_RECIPE, payload: _id });
};

// Returns true
export const showMenu = () => {
  return { type: SHOW_MENU, payload: true };
};

// Returns false
export const hideMenu = () => {
  return { type: HIDE_MENU, payload: false };
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
  showMenu,
  hideMenu,
}

export default actions;