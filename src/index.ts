import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphQL/schema";
import { resolvers } from "./graphQL/resolvers";
import { connectDB } from "./db";

const startServer = async () => {
  await connectDB(); // Connect to MongoDB

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
