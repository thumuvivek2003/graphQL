import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!): User!
    createPost(title: String!, content: String!, userId: ID!): Post!
  }
`;
