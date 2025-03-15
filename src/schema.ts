// src/schema.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    createdAt: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    postMessage(content: String!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }
`;