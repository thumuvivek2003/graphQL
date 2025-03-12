import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date
  scalar Email
  scalar URL

  type Query {
    getDate: Date
    getEmail: Email
    getURL: URL
  }

  type Mutation {
    setDate(date: Date!): String
    setEmail(email: Email!): String
    setURL(url: URL!): String
  }
`;
