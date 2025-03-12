import { gql } from "apollo-server";

// Define the Interface
export const typeDefs = gql`
  interface Animal {
    name: String!
    age: Int!
  }

  type Dog implements Animal {
    name: String!
    age: Int!
    breed: String!
  }

  type Cat implements Animal {
    name: String!
    age: Int!
    color: String!
  }

  type Query {
    getAnimals: [Animal!]!
  }
`;
