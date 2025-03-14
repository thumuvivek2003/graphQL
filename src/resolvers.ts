interface Post {
  id: string;
  title: string;
  content: string;
}

const mockPosts: Post[] = new Array(100).fill(null).map((_, index) => ({
  id: index.toString(),
  title: `Post ${index + 1}`,
  content: `Content for post ${index + 1}`,
}));

const resolvers = {
  Query: {
    getPosts: (
      _parent: any,
      { offset, limit }: { offset: number; limit: number }
    ) => {
      // Get the posts based on offset and limit
      const posts = mockPosts.slice(offset, offset + limit);
      const totalCount = mockPosts.length;
      const hasNextPage = offset + limit < totalCount;

      return {
        posts,
        totalCount,
        hasNextPage,
      };
    },
  },
};

export default resolvers;
