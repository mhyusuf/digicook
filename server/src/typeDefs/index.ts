import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getPublicCollections(query: String): [Collection]
    getUserCollections(query: String): [Collection]
    getCollectionById(_id: String): Collection
    getPublicRecipes(query: String): [Recipe]
    getRecipesByCollection(_collection: String, query: String): [Recipe]
    getRecipeDetail(id: String!): Recipe
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
    _user: String!
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
      id: String
      name: String
      description: String
      isPrivate: String
    ): Collection
    deleteCollection(id: String): Recipe
    createRecipe(
      name: String
      category: String
      instructions: String
      ingredients: [IngredientInput]
      _collection: String
    ): Recipe
    updateRecipe(
      id: String
      name: String
      category: String
      instructions: String
      ingredients: [IngredientInput]
    ): Recipe
    deleteRecipe(id: String): Recipe
  }

  input IngredientInput {
    name: String
    quantity: String
  }
`;

export default typeDefs;
