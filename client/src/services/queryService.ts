import { gql } from '@apollo/client';

export const GET_PUBLIC_COLLECTIONS = gql`
  query getPublicCollections($query: String) {
    getPublicCollections(query: $query) {
      _id
      name
      description
      _user {
        _id
        name
      }
    }
  }
`;

export const GET_PUBLIC_RECIPES = gql`
  query getPublicRecipes($query: String) {
    getPublicRecipes(query: $query) {
      _id
      name
      category
      _user {
        _id
        name
      }
    }
  }
`;

export const GET_USER_COLLECTIONS = gql`
  query getUserCollections($query: String) {
    getUserCollections(query: $query) {
      _id
      name
      description
      _user {
        _id
        name
      }
    }
  }
`;

export const GET_COLLECTION_BY_ID = gql`
  query getCollectionById($_id: String) {
    getCollectionById(_id: $_id) {
      _id
      name
    }
  }
`;

export const GET_RECIPES_BY_COLLECTION = gql`
  query getRecipesByCollection($_collection: String, $query: String) {
    getRecipesByCollection(_collection: $_collection, query: $query) {
      _id
      name
      category
      _user {
        _id
        name
      }
    }
  }
`;

export const GET_RECIPE_DETAIL = gql`
  query getRecipeDetail($_id: String!) {
    getRecipeDetail(_id: $_id) {
      _id
      name
      category
      ingredients {
        name
        quantity
      }
      instructions
      _user {
        _id
        name
      }
    }
  }
`;
