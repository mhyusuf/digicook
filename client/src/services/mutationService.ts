import { gql } from '@apollo/client';

export const CREATE_COLLECTION = gql`
  mutation createCollection(
    $name: String
    $description: String
    $isPrivate: Boolean
  ) {
    createCollection(
      name: $name
      description: $description
      isPrivate: $isPrivate
    ) {
      _id
      name
      description
      isPrivate
      _recipes
      _user {
        _id
        name
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $name: String
    $category: String
    $ingredients: [IngredientInput]
    $instructions: String
    $_collection: String
  ) {
    createRecipe(
      name: $name
      category: $category
      ingredients: $ingredients
      instructions: $instructions
      _collection: $_collection
    ) {
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
