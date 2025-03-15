import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDB } from "./database";
import userLoader from "./loaders/userLoader";

const startServer = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      loaders: {
        userLoader
      }
    })
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
};

startServer();
