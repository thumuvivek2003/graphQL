import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { gql } from "graphql-tag";

// Define the schema for the orders service
const typeDefs = gql`
  extend type Query {
    orders: [Order]
  }

  type Order {
    id: ID!
    product: String!
    price: Float!
    user: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }
`;

// Sample data
const orders = [
  { id: "101", product: "Laptop", price: 999.99, userId: "1" },
  { id: "102", product: "Phone", price: 499.99, userId: "2" },
];

// Resolvers
const resolvers = {
  Query: {
    orders: () => orders,
  },
  Order: {
    user(order: { userId: string }) {
      return { __typename: "User", id: order.userId };
    },
  },
};

// Start Apollo Server for Orders Service
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Orders service running at ${url}`);
});
