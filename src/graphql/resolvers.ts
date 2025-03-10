import { Resolvers } from "./types";

const books = [
  { id: "1", title: "Book1", author: "Auth1" },
  { id: "2", title: "Book2", author: "Auth2" },
  { id: "3", title: "Book3", author: "Auth3" },
];

export const resolvers: Resolvers = {
  Query: {
    books: (_, args) => {
      let result = books;

      if (args.title) {
        result = result.filter((book) =>
          book.title.toLowerCase().includes(args.title?.toLowerCase() ?? "")
        );
      }

      if (args.author) {
        result = result.filter((book) =>
          book.author.toLowerCase().includes(args.author?.toLowerCase() ?? "")
        );
      }
      if (args.id) {
        result = result.filter((book) =>
          book.author.toLowerCase().includes(args.id?.toLowerCase() ?? "")
        );
      }

      return result;
    },
  },
};
