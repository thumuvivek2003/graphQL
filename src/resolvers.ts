interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser: User = { id: String(users.length + 1), name, email };
      users.push(newUser);
      return newUser;
    },
    updateUser: (
      _: any,
      { id, name, email }: { id: string; name?: string; email?: string }
    ) => {
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("User not found");

      if (name) user.name = name;
      if (email) user.email = email;

      return user;
    },
  },
};
