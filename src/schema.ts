// src/schema.ts
import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthResponse
    createUser(username: String!, password: String!, role: Role!): User
  }

  type User {
    id: ID!
    username: String!
    role: Role!
  }

  type AuthResponse {
    token: String!
  }

  enum Role {
    ADMIN
    USER
  }
`;
