import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type Query {
    files: [File]
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

export default typeDefs;
