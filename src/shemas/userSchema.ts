// src/schemas/userSchema.ts
import { gql } from "apollo-server";

const typeDefs = gql`
  # Define GraphQL Input Type
  input UserInput

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

export type UserInput = {
  name: string;
  email: string;
  age: number;
};
