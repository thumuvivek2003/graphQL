import { Query } from "mongoose";
import { User, IUser } from "../models/UserModel";
import { UserInput } from "../shemas/userSchema";
export const resolvers = {
  Mutation: {
    addUser: async (_: any, { input }: { input: UserInput }) => {
      // Create new user using the input data
      const user = new User({
        name: input.name,
        email: input.email,
        age: input.age,
      });

      // Save user to MongoDB
      await user.save();

      return user;
    },
  },
  Query: {
    _: () => false,
  },
};
