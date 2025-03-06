// schema.ts
import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    hello: String
    getUser(id: Int!): User
    add(a: Float!, b: Float!): Float
    subtract(a: Float!, b: Float!): Float
    multiply(a: Float!, b: Float!): Float
  }

  type User {
    id: Int
    name: String
    email: String
  }
`;
