// resolvers.ts
export const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },

    getUser: (_: any, { id }: { id: number }) => {
      // Mock data for users (just as before)
      const users = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 3, name: "Sam Brown", email: "sam.brown@example.com" },
      ];

      return users.find((user) => user.id === id);
    },

    // Add two numbers
    add: (_: any, { a, b }: { a: number; b: number }) => {
      return a + b;
    },

    // Subtract two numbers
    subtract: (_: any, { a, b }: { a: number; b: number }) => {
      return a - b;
    },

    // Multiply two numbers
    multiply: (_: any, { a, b }: { a: number; b: number }) => {
      return a * b;
    },
  },
};
