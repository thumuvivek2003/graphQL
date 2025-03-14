import { User } from "./types"; // Define types for User

// Sample data for demonstration
const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

// Resolver functions
export const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) => {
      try {
        const user = users.find((user) => user.id === id);
        console.log("User", user);
        if (!user) {
          console.log("throwing");
          // Throwing an error when the user is not found
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        // Handling errors and returning a meaningful message
        return { message: error.message };
      }
    },
  },
};
