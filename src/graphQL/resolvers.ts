const resolvers = {
  Query: {
    getStatus: () => {
      return "PENDING";
    },
    search: (_: any, { query }: { query: string }) => {
      const books = [
        { id: "1", title: "GraphQL Guide", author: "John Doe" },
        { id: "2", title: "Learning TypeScript", author: "Jane Smith" },
      ];
      const authors = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ];

      if (query === "book") {
        return books;
      } else if (query === "author") {
        return authors;
      }
      return [];
    },
  },

  SearchResult: {
    __resolveType(obj: any) {
      if (obj.title) {
        return "Book";
      }
      if (obj.name) {
        return "Author";
      }
      return null;
    },
  },
};

export default resolvers;
