import { gql } from "apollo-server";

export const typeDefs = gql`
  directive @include(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
  directive @skip(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT

  # Custom directive example
  directive @uppercase on FIELD_DEFINITION

  type Query {
    hello(name: String!): String @uppercase
    info: String
  }
`;
