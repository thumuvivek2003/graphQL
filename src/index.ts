import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphQL/schema';
import { resolvers } from './graphQL/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
