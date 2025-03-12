To create and integrate custom scalar types (e.g., `Date`, `Email`, `URL`) in GraphQL with Node.js, TypeScript, and Apollo Server, you'll need to follow these steps:

### 1. Set up the Project

Start by setting up a Node.js project with TypeScript and Apollo Server.

#### Step 1: Initialize the Project
```bash
mkdir graphql-custom-scalars
cd graphql-custom-scalars
npm init -y
```

#### Step 2: Install Dependencies
Install Apollo Server, GraphQL, TypeScript, and other necessary libraries.
```bash
npm install apollo-server graphql
npm install --save-dev typescript @types/node ts-node
```

#### Step 3: Create the `tsconfig.json` file
Generate a `tsconfig.json` for TypeScript configuration:
```bash
npx tsc --init
```

Update the `tsconfig.json` file to match the following configuration for better compatibility:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 2. Create Custom Scalar Types

In GraphQL, custom scalars allow you to define custom data types that don't exist in the standard GraphQL spec (like `String`, `Int`, `Float`, etc.). For your task, we'll create custom scalars for `Date`, `Email`, and `URL`.

### 3. Code Example for Custom Scalars

#### Step 1: Create a `scalars.ts` file
This file will define the custom scalar types (`Date`, `Email`, and `URL`).

```typescript
import { GraphQLScalarType, Kind } from 'graphql';

// Custom scalar for Date
export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Date',
  serialize(value: any) {
    if (value instanceof Date) {
      return value.toISOString(); // Convert Date to ISO string for JSON response
    }
    throw new Error('Invalid Date');
  },
  parseValue(value: any) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date; // Parse ISO string into Date object
    }
    throw new Error('Invalid Date');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (!isNaN(date.getTime())) {
        return date; // Parse ISO string into Date object
      }
    }
    throw new Error('Invalid Date');
  }
});

// Custom scalar for Email
export const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'Custom scalar type for Email',
  serialize(value: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof value === 'string' && emailRegex.test(value)) {
      return value;
    }
    throw new Error('Invalid Email');
  },
  parseValue(value: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof value === 'string' && emailRegex.test(value)) {
      return value;
    }
    throw new Error('Invalid Email');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(ast.value)) {
        return ast.value;
      }
    }
    throw new Error('Invalid Email');
  }
});

// Custom scalar for URL
export const URLScalar = new GraphQLScalarType({
  name: 'URL',
  description: 'Custom scalar type for URL',
  serialize(value: any) {
    try {
      const url = new URL(value);
      return url.toString(); // Return the URL string
    } catch (err) {
      throw new Error('Invalid URL');
    }
  },
  parseValue(value: any) {
    try {
      const url = new URL(value);
      return url; // Return the URL object
    } catch (err) {
      throw new Error('Invalid URL');
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        const url = new URL(ast.value);
        return url; // Return the URL object
      } catch (err) {
        throw new Error('Invalid URL');
      }
    }
    throw new Error('Invalid URL');
  }
});
```

- **DateScalar**: This handles serialization and parsing of `Date` objects.
- **EmailScalar**: Validates and parses emails using a regular expression.
- **URLScalar**: Validates and parses URLs using the `URL` API.

#### Step 2: Define the GraphQL Schema

In the `schema.ts` file, define your GraphQL schema, including the custom scalars and types.

```typescript
import { gql } from 'apollo-server';

// Define the GraphQL schema
export const typeDefs = gql`
  scalar Date
  scalar Email
  scalar URL

  type Query {
    getDate: Date
    getEmail: Email
    getURL: URL
  }

  type Mutation {
    setDate(date: Date!): String
    setEmail(email: Email!): String
    setURL(url: URL!): String
  }
`;
```

- The schema defines three custom scalars (`Date`, `Email`, and `URL`).
- It also defines query and mutation fields that use these custom scalars.

#### Step 3: Set up the Apollo Server

Create an `index.ts` file where you'll set up the Apollo Server and integrate the custom scalars.

```typescript
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { DateScalar, EmailScalar, URLScalar } from './scalars';

// Define the resolvers
const resolvers = {
  Date: DateScalar,
  Email: EmailScalar,
  URL: URLScalar,

  Query: {
    getDate: () => new Date(),
    getEmail: () => 'example@example.com',
    getURL: () => 'https://www.example.com'
  },

  Mutation: {
    setDate: (_: any, { date }: { date: Date }) => `Received Date: ${date.toISOString()}`,
    setEmail: (_: any, { email }: { email: string }) => `Received Email: ${email}`,
    setURL: (_: any, { url }: { url: string }) => `Received URL: ${url}`
  }
};

// Create and start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
```

- The Apollo Server is created with `typeDefs` and `resolvers`, including our custom scalar types.

#### Step 4: Running the Server

To run your server, add a script to `package.json`:

```json
"scripts": {
  "start": "ts-node src/index.ts"
}
```

Now, run the server:

```bash
npm run start
```

The server will start, and you can test it in a GraphQL playground (accessible at `http://localhost:4000`).

### 4. Testing the GraphQL API

You can now test the GraphQL API using the following queries and mutations:

#### Query Example
```graphql
query {
  getDate
  getEmail
  getURL
}
```

#### Mutation Example
```graphql
mutation {
  setDate(date: "2025-03-12T12:00:00Z")
  setEmail(email: "test@domain.com")
  setURL(url: "https://www.test.com")
}
```

### Conclusion

In this example, you've learned how to:

1. Create and define custom scalar types (`Date`, `Email`, `URL`) in GraphQL.
2. Integrate custom scalars with Apollo Server using TypeScript.
3. Test and query custom scalar types in a GraphQL API.

This setup can be expanded and adjusted based on your needs for different custom scalar types.