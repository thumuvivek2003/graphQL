export type Book = {
  id: string;
  title: string;
  author: string;
};
export type BookArgs = {
  title?: string;
  author?: string;
  id?: string;
};

export type QueryResolvers = {
  books: (_: any, args: BookArgs) => Book[];
  books2: (_: any, args: BookArgs) => Book[];
};

export type Resolvers = {
  Query: QueryResolvers;
};
