import { UserModel } from "../models/User";
import { PostModel } from "../models/Post";

export const resolvers = {
  Query: {
    getUsers: async () => await UserModel.find(),
    getUser: async (_: any, { id }: { id: string }) =>
      await UserModel.findById(id),
    getPosts: async () => await PostModel.find(),
    getPost: async (_: any, { id }: { id: string }) =>
      await PostModel.findById(id),
  },

  User: {
    posts: async (parent: any) => await PostModel.find({ userId: parent.id }), // Fetch posts related to the user
  },

  Post: {
    user: async (parent: any) => await UserModel.findById(parent.userId), // Fetch user for a post
  },

  Mutation: {
    createUser: async (_: any, { name }: { name: string }) => {
      const newUser = new UserModel({ name });
      return await newUser.save();
    },
    createPost: async (
      _: any,
      {
        title,
        content,
        userId,
      }: { title: string; content: string; userId: string }
    ) => {
      const newPost = new PostModel({ title, content, userId });
      return await newPost.save();
    },
  },
};
