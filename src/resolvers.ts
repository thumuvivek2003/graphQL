// src/resolvers.ts
import { AuthenticationError, ForbiddenError } from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  { id: "1", username: "admin", password: "adminpassword", role: "ADMIN" },
  { id: "2", username: "user", password: "userpassword", role: "USER" },
];

const SECRET_KEY = "your_secret_key";

export const resolvers = {
  Query: {
    users: (parent: any, args: any, context: any) => {
      if (!context.user || context.user.role !== "ADMIN") {
        throw new ForbiddenError("Not authorized");
      }
      return users;
    },
    me: (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      return users.find((user) => user.id === context.user.id);
    },
  },
  Mutation: {
    login: async (
      parent: any,
      { username, password }: { username: string; password: string }
    ) => {
      const user = users.find((u) => u.username === username);
      console.log(user);
      if (!user || password !== user.password) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token };
    },
    createUser: (
      parent: any,
      {
        username,
        password,
        role,
      }: { username: string; password: string; role: string }
    ) => {
      const newUser = {
        id: (users.length + 1).toString(),
        username,
        password: bcrypt.hashSync(password, 10),
        role,
      };
      users.push(newUser);
      return newUser;
    },
  },
};
