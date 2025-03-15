import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { gql } from "graphql-tag";

// Define the schema for the users service
const typeDefs = gql`
  extend type Query {
    users: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }
`;

// Sample data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Doe", email: "jane@example.com" },
];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  User: {
    __resolveReference(user: { id: string }) {
      return users.find((u) => u.id === user.id);
    },
  },
};

// Start Apollo Server for Users Service
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Users service running at ${url}`);
});
