import { ApolloServer, gql } from "apollo-server";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "./generateToken";

dotenv.config();

interface Context {
  user: any;
}

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): String
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: (parent: any, args: any, context: Context) => {
      return context.user;
    },
  },
  Mutation: {
    login: async (
      parent: any,
      args: { username: string; password: string }
    ) => {
      if (args.username === "admin" && args.password === "password") {
        const user = { id: "1", username: args.username };
        return generateToken(user);
      } else {
        throw new Error("Invalid credentials");
      }
    },
  },
};

const authenticate = (context: any) => {
  const body = context.req.body;
  if (body && body.query) {
    if (body.query.includes("mutation") && body.query.includes("login")) {
      return null;
    }
  }
  const token = context.req.headers["authorization"] || "";
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  try {
    const user = verify(token, process.env.JWT_SECRET as string);
    return user;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => {
    const user = authenticate({ req });
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
