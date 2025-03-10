import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books(title: String, author: String, id: String): [Book]
    books2(title: String, author: String, id: String): [Book]
  }
`;
