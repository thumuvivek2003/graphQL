// src/server.ts
import { ApolloServer, AuthenticationError } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { authenticate } from "./authMiddleware";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
