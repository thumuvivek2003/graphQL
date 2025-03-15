import { Post } from "./models/Post";
import { User } from "./models/User";
import userLoader from "./loaders/userLoader";

export const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find();
    },
  },
  Post: {
    // Optimize fetching users with DataLoader
    user: async (post, _, { loaders }) => {
      return loaders.userLoader.load(post.userId);
    },
  },
};
