export const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: string }) => {
      return `Hello, ${name}!`;
    },
    info: () => "This is a sample GraphQL API",
  },
};
