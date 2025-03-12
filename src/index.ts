import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphQL/schema";
import { DateScalar, EmailScalar, URLScalar } from "./graphQL/scalars";

// Define the resolvers
const resolvers = {
  Date: DateScalar,
  Email: EmailScalar,
  URL: URLScalar,

  Query: {
    getDate: () => new Date(),
    getEmail: () => "example@example.casdom",
    getURL: () => "https://www.example.com",
  },

  Mutation: {
    setDate: (_: any, { date }: { date: Date }) =>
      `Received Date: ${date.toISOString()}`,
    setEmail: (_: any, { email }: { email: string }) =>
      `Received Email: ${email}`,
    setURL: (_: any, { url }: { url: string }) => `Received URL: ${url}`,
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
