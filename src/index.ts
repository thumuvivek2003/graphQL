import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Define GraphQL Schema
const typeDefs = `
  type Query {
    hello: String
    hello2:String
  }
`;

// Define Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, Apollo GraphQL with TypeScript!",
    hello2: () => "Hello, Apollo GraphQL with TypeScript!",
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start Express Server
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Apollo GraphQL Server running at http://localhost:${PORT}/graphql`
    );
  });
}

startServer();
