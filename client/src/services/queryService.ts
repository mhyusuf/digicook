import { gql } from '@apollo/client';

export const GET_PUBLIC_COLLECTIONS = gql`
  query getPublicCollections($query: String) {
    getPublicCollections(query: $query) {
      _id
      name
      description
      _user {
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
        name
      }
    }
  }
`;
