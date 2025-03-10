import User from "../models/User";

const resolvers = {
  Query: {
    async getUsers() {
      return await User.find();
    },
    async getUser(_: any, { id }: { id: string }) {
      return await User.findById(id);
    },
  },

  Mutation: {
    async createUser(
      _: any,
      { name, email, age }: { name: string; email: string; age?: number }
    ) {
      const newUser = new User({ name, email, age });
      return await newUser.save();
    },

    async updateUser(
      _: any,
      {
        id,
        name,
        email,
        age,
      }: { id: string; name?: string; email?: string; age?: number }
    ) {
      return await User.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true }
      );
    },

    async deleteUser(_: any, { id }: { id: string }) {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default resolvers;
