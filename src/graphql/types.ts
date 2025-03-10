export type Book = {
  id: string;
  title: string;
  author: string;
};

export type QueryResolvers = {
  books: (
    _: any,
    args: { title?: string; author?: string; id?: string }
  ) => Book[];
};

export type Resolvers = {
  Query: QueryResolvers;
};
