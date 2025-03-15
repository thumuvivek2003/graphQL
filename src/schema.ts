import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type Query {
    posts: [Post!]!
  }
`;
