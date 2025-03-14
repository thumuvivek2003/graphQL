// src/index.ts
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./shemas/userSchema";
import { resolvers } from "./resolvers/userResolver";

// MongoDB URI (replace with your own MongoDB URI)
const MONGO_URI = "mongodb://localhost:27017/graphQL";


// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen(4000);
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
