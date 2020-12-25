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
      description
      isPrivate
    }
  }
`;

export const GET_COLLECTION_DETAIL = gql`
  query getCollectionDetail($_collection: String, $query: String) {
    getCollectionById(_id: $_collection) {
      _id
      name
      description
      isPrivate
    }
    getRecipesByCollection(_collection: $_collection, query: $query) {
      _id
      name
      category
      _collection
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
      _collection
      _user {
        _id
        name
      }
    }
  }
`;
