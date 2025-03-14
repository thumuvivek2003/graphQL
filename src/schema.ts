import { gql } from 'apollo-server';

// Define the GraphQL schema
export const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Error {
    message: String!
  }

  union UserResult = User | Error
`;
