import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getPublicCollections(query: String): [Collection]
    getUserCollections(query: String): [Collection]
    getCollectionById(_id: String): Collection
    getPublicRecipes(query: String): [Recipe]
    getRecipesByCollection(_collection: String, query: String): [Recipe]
    getRecipeDetail(_id: String!): Recipe
  }

  type User {
    _id: String!
    googleId: String!
    email: String!
  }

  type Collection {
    _id: String!
    name: String!
    description: String!
    isPrivate: Boolean!
    _user: User
    _recipes: [String]!
  }

  type Recipe {
    _id: String!
    name: String!
    category: String
    instructions: String!
    ingredients: [Ingredient]
    _collection: String!
    _user: User!
  }

  type Ingredient {
    name: String!
    quantity: String!
  }

  type Mutation {
    createCollection(
      name: String
      description: String
      isPrivate: Boolean
    ): Collection
    updateCollection(
      _id: String
      name: String
      description: String
      isPrivate: Boolean
    ): Collection
    deleteCollection(_id: String): Collection
    createRecipe(
      name: String
      category: String
      instructions: String
      ingredients: [IngredientInput]
      _collection: String
    ): Recipe
    updateRecipe(
      _id: String
      name: String
      category: String
      instructions: String
      ingredients: [IngredientInput]
    ): Recipe
    deleteRecipe(_id: String): Recipe
  }

  input IngredientInput {
    name: String
    quantity: String
  }
`;

export default typeDefs;
