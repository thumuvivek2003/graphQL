import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type PaginatedPosts {
    posts: [Post!]!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  type Query {
    getPosts(offset: Int!, limit: Int!): PaginatedPosts!
  }
`;
