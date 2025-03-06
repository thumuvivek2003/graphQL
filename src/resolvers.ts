// resolvers.ts
export const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
    getUser: (_: any, { id }: { id: number }) => {
      // Mock data for demonstration
      const users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];

      // Find the user by ID
      return users.find((user) => user.id === id);
    },
  },
};
