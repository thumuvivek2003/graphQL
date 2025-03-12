import { gql } from "apollo-server";

// Define Enum Type
const typeDefs = gql`
  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
  }

  # Union Type: It can be one of the following types
  union SearchResult = Book | Author

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Author {
    id: ID!
    name: String!
  }

  type Query {
    getStatus: Status
    search(query: String!): [SearchResult]
  }
`;

export default typeDefs;
