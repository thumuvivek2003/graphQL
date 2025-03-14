// src/schemas/userSchema.ts
import { gql } from "apollo-server";

const typeDefs = gql`
  # Define GraphQL Input Type
  input UserInput {
    name: String!
    email: String!
    age: Int!
  }

  # Define the GraphQL Mutation
  type Mutation {
    addUser(input: UserInput!): User!
  }
  type Query {
    _: Boolean
  }

  # Define the User Type (output type)
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }
`;

export { typeDefs };
