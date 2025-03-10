import { ApolloServer, gql } from "apollo-server";

// Define Type Definitions (Schema)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    allUsers: [User!]!
  }
`;

// Sample Data
const users = [
  { id: "1", name: "Alice", age: 25, email: "alice@example.com" },
  { id: "2", name: "Bob", age: 30, email: "bob@example.com" },
];

// Define Resolvers
const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) =>
      users.find((user) => user.id === id),
    allUsers: () => users,
  },
};

// Create and Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
