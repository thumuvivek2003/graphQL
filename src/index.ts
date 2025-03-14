import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const isDev = false;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    // Customize the error format
    return isDev
      ? err
      : {
          message: err.message,
          code: err.extensions.code,
        };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
