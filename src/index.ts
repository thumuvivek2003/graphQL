import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/graphqlCRUD")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
}

startServer();
