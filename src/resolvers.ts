// resolvers.ts
import { ApolloError } from "apollo-server-errors";

// Sample data to simulate a database
const posts = [
  {
    id: 1,
    title: "First Post",
    content: "Content for the first post",
    createdAt: "2025-03-10",
  },
  {
    id: 2,
    title: "Second Post",
    content: "Content for the second post",
    createdAt: "2025-03-11",
  },
  {
    id: 3,
    title: "Third Post",
    content: "Content for the third post",
    createdAt: "2025-03-12",
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "Content for the fourth post",
    createdAt: "2025-03-13",
  },
  {
    id: 5,
    title: "Fifth Post",
    content: "Content for the fifth post",
    createdAt: "2025-03-14",
  },
];

const encodeCursor = (id: number): string =>
  Buffer.from(id.toString()).toString("base64");
const decodeCursor = (cursor: string): number =>
  parseInt(Buffer.from(cursor, "base64").toString());

const resolvers = {
  Query: {
    getPosts: (
      _: any,
      {
        first,
        after,
        last,
        before,
      }: { first: number; after: string; last: number; before: string }
    ) => {
      let items = posts;

      if (after) {
        const decodedCursor = decodeCursor(after);
        items = items.filter((post) => post.id > decodedCursor);
      }

      if (before) {
        const decodedCursor = decodeCursor(before);
        items = items.filter((post) => post.id < decodedCursor);
      }

      if (first) {
        items = items.slice(0, first);
      }

      if (last) {
        items = items.slice(-last);
      }

      const edges = items.map((post) => ({
        node: post,
        cursor: encodeCursor(post.id),
      }));

      const startCursor = edges.length > 0 ? edges[0].cursor : null;
      const endCursor =
        edges.length > 0 ? edges[edges.length - 1].cursor : null;

      const hasNextPage = posts.some(
        (post) => post.id > decodeCursor(endCursor || "0")
      );
      const hasPreviousPage = posts.some(
        (post) => post.id < decodeCursor(startCursor || "0")
      );

      return {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      };
    },
  },
};

export default resolvers;
