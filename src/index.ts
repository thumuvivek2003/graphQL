// index.ts
import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers";
import { readFileSync } from "fs";
import { join } from "path";

// Load schema
const typeDefs = gql(readFileSync(join(__dirname, "schema.graphql"), "utf-8"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
