// schema.ts
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String
    getUser(id: Int!): User
  }

  type User {
    id: Int
    name: String
    email: String
  }
`;
