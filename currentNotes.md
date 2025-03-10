### GraphQL Mutations
#### What is Mutation ?
GraphQL mutations allow you to modify data (add, update, delete) in an API. 
In this guide, we will implement basic mutations.


#### Steps
1. Define GraphQL Schema
2. Implement Resolvers

#### 1. Define GraphQL Schema

GraphQL schemas define the data structure and operations available in the API.

- For creating schema - Create a `schema.ts` file, which defines the types, queries, and mutations.

##### Code
```ts
import { gql } from "apollo-server";

export const typeDefs = gql`
  # Define a types - here User type with id, name, and email
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # Define queries for fetching data
  type Query {
    users: [User!]!
  }

  # Define mutations for modifying data
  type Mutation {
    addUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
  }
`;
```

##### Explaination

- **`User` type:** Represents a user with `id`, `name`, and `email`.
- **`Query` type:**
  - `users`: Fetch all users.
- **`Mutation` type:**
  - `addUser(name, email)`: Adds a new user.
  - `updateUser(id, name, email)`: Updates an existing user.

---

#### 2. Implement Resolvers

Resolvers define how queries and mutations interact with data.

##### 2.1 Create a `resolvers.ts` File

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

// In-memory array to store users
const users: User[] = [];

export const resolvers = {
  Query: {
    // Fetch all users
    users: () => users,
  },
  Mutation: {
    // Add a new user
    addUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser: User = { id: data.lenght + 1, name, email };
      users.push(newUser);
      return newUser;
    },

    // Update an existing user
    updateUser: (
      _: any,
      { id, name, email }: { id: string; name?: string; email?: string }
    ) => {
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("User not found");

      if (name) user.name = name;
      if (email) user.email = email;

      return user;
    },
  },
};
```

##### Explaination

- **`Query.users`**: Returns all users from the array.
- **`Mutation.addUser`**:
  - Generates a **ID** using `length+1` 1 based index .
  - Adds a new user to the array.
  - Returns the created user.
- **`Mutation.updateUser`**:
  - Finds the user by ID.
  - Updates name and/or email if provided.
  - Returns the updated user.

---

#### Set Up Apollo Server
Now, we will configure **Apollo Server** to handle GraphQL requests.

##### Create a `server.ts` File

```ts
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

##### Explaination

- Imports **type definitions** and **resolvers**.
- Creates an **Apollo Server** instance.
- Starts the server and logs the URL.


#### Run the Server

Start the TypeScript server using:

```sh
npm run dev
```

You should see:

```
🚀 Server ready at http://localhost:4000
```


#### Testing Mutations in GraphQL Playground
Once the server is running, open GraphQL Playground at:

👉 http://localhost:4000

##### 6.1 Add a User

**Mutation:**

```graphql
mutation {
  addUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

**Response:**

```json
{
  "data": {
    "addUser": {
      "id": "some-uuid",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```


#### 6.2 Fetch All Users

**Query:**

```graphql
query {
  users {
    id
    name
    email
  }
}
```

**Response:**

```json
{
  "data": {
    "users": [
      {
        "id": "some-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
}
```

---

### **6.3 Update a User**

Replace `some-uuid` with the actual user ID.

**Mutation:**

```graphql
mutation {
  updateUser(
    id: "some-uuid"
    name: "John Updated"
    email: "updated@example.com"
  ) {
    id
    name
    email
  }
}
```

**Response:**

```json
{
  "data": {
    "updateUser": {
      "id": "some-uuid",
      "name": "John Updated",
      "email": "updated@example.com"
    }
  }
}
```

---

# **7. Summary**

### ✅ **What We Learned**

✔ Set up a **GraphQL API** using **Node.js, TypeScript, and Apollo Server**.  
✔ Defined a **GraphQL schema** with queries and mutations.  
✔ Implemented **resolvers** for fetching and modifying data.  
✔ Tested **mutations** using **GraphQL Playground**.

### 🎯 **Next Steps**

- Connect to a **real database** (MongoDB, PostgreSQL).
- Implement **authentication**.
- Add **error handling**.

Would you like a guide on integrating this with a database? 🚀
