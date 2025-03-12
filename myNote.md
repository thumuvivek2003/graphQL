| **ID** | **Project/Task Name**                       | **Learning Outcomes**                                                                            | **Task Description**                                                                                                                                                              |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Setup Node.js GraphQL Server                | Basics, Server Setup                                                                             | Create your first Node.js server with Express and GraphQL, configure initial schema and resolvers.                                                                                |
| 2      | GraphQL Schema Creation                     | Schema Definition Language (SDL)                                                                 | Define a basic schema with Query types and fields for a mock API.                                                                                                                 |
| 3      | GraphQL Arithmetic Operations               | Learn to implement GraphQL resolvers for basic arithmetic operations and use aliases in queries. | Create a GraphQL server with resolvers for addition, subtraction, and multiplication, and use aliases to handle multiple operations in a single query.                            |
| 4      | GraphQL Playground Exploration              | Testing Queries, Tool Usage                                                                      | Use GraphQL Playground to test and validate queries written previously.                                                                                                           |
| 5      | Mutations Basics                            | GraphQL Mutations                                                                                | Implement basic mutations for adding/updating data entries.                                                                                                                       |
| 6      | CRUD Operations with GraphQL                | CRUD, Resolver Logic                                                                             | Build full CRUD operations (Create, Read, Update, Delete) for an entity using GraphQL queries and mutations.                                                                      |
| 7      | Query Arguments                             | Arguments Usage                                                                                  | Utilize query arguments for filtering or selecting specific items from resolver functions.                                                                                        |
| 8      | GraphQL Aliases and Fragments               | Query Optimization                                                                               | Write optimized queries using aliases and reusable fragments.                                                                                                                     |
| 9      | Nested Queries and Relationships            | Handling Nested Data                                                                             | Implement nested queries for handling parent-child relationships between types.                                                                                                   |
| 10     | Custom Scalar Types                         | Custom Types                                                                                     | Create and integrate custom scalar types (e.g., Date, Email, URL).                                                                                                                |
| 11     | Enum and Union Types                        | Advanced Schema Types                                                                            | Define and use enum and union types in your schema to handle multiple possible data types.                                                                                        |
| 12     | Interfaces in GraphQL                       | Interface Concepts                                                                               | Implement interfaces to abstract common fields across GraphQL types.                                                                                                              |
| 13     | Input Types in Mutations                    | Input Types, Mutation Arguments                                                                  | Use GraphQL input types effectively in mutation arguments to improve code readability.                                                                                            |
| 14     | Error Handling in GraphQL                   | Error Management                                                                                 | Handle and manage errors gracefully within resolvers and return meaningful error messages to clients.                                                                             |
| 15     | GraphQL Directives                          | Directives Implementation                                                                        | Implement built-in GraphQL directives (@include, @skip) and create custom directives.                                                                                             |
| 16     | Authentication with GraphQL                 | Auth Concepts, Middleware                                                                        | Add JWT authentication and protect GraphQL APIs using middleware integration.                                                                                                     |
| 17     | Authorization and Role-Based Access         | Authorization Logic                                                                              | Implement role-based access control to GraphQL schema fields using resolvers and middleware.                                                                                      |
| 18     | Pagination Techniques                       | Pagination Strategies (Offset-based)                                                             | Integrate offset-based pagination strategies in GraphQL queries and resolvers.                                                                                                    |
| 19     | Cursor-Based Pagination                     | Cursor-Based Pagination                                                                          | Implement cursor-based pagination for efficient data fetching.                                                                                                                    |
| 20     | GraphQL Subscriptions                       | Real-Time Data Updates, WebSockets                                                               | Build GraphQL subscriptions using WebSockets for real-time data updates.                                                                                                          |
| 21     | DataLoader Usage                            | Performance Optimization                                                                         | Implement DataLoader library to optimize fetching efficiency and resolve the N+1 query problem.                                                                                   |
| 22     | Schema Stitching and Federation             | Schema Management, Microservices                                                                 | Combine multiple GraphQL schemas from different services into one unified schema using Apollo Federation.                                                                         |
| 23     | GraphQL File Uploads                        | Handling Files, Multipart Requests                                                               | Set up GraphQL server to handle file uploads using GraphQL multipart request specifications.                                                                                      |
| 24     | Logging and Monitoring GraphQL APIs         | Observability, Logging Tools                                                                     | Implement logging, tracing, and monitoring mechanisms in GraphQL applications using libraries like Apollo Studio.                                                                 |
| 25     | Caching in GraphQL                          | Performance, Caching Techniques                                                                  | Implement basic caching strategies (In-memory cache, Redis) for optimizing GraphQL response performance.                                                                          |
| 26     | Integration with Databases (MongoDB)        | Database Integration                                                                             | Connect your GraphQL server to MongoDB using Mongoose to manage persistent storage.                                                                                               |
| 27     | Integration with Databases (SQL, Sequelize) | ORM Usage                                                                                        | Integrate SQL databases (e.g., PostgreSQL, MySQL) with GraphQL API via Sequelize ORM and perform CRUD operations.                                                                 |
| 28     | Testing GraphQL APIs                        | Testing Methods                                                                                  | Write unit tests and integration tests for GraphQL APIs using Jest and Apollo Server Testing tools.                                                                               |
| 29     | Deployment of GraphQL Server                | Deployment, Hosting                                                                              | Deploy the GraphQL server to cloud services (Heroku, AWS, or DigitalOcean), configure environment variables, and optimize for production use.                                     |
| 30     | Project Capstone                            | End-to-End GraphQL Application                                                                   | Build an end-to-end GraphQL app integrating authentication, authorization, database storage, file uploads, subscriptions, schema federation, testing, monitoring, and deployment. |


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


##### Fetch All Users

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


#####  Update a User

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

## GraphQL CRUD Operations 

### 1. Introduction
In this guide, we implement **CRUD (Create, Read, Update, Delete) operations** in **GraphQL** using **Node.js, TypeScript, Apollo Server**, and **MongoDB (Mongoose)**.

---

## **2. Project Setup**
### **2.1 Initialize Node.js and TypeScript Project**
- Create a new folder and initialize a Node.js project:
  ```sh
  mkdir graphql-crud
  cd graphql-crud
  npm init -y
  ```
- Install TypeScript and necessary dependencies:
  ```sh
  npm install --save-dev typescript ts-node @types/node
  ```
- Generate a TypeScript configuration file:
  ```sh
  npx tsc --init
  ```

### **2.2 Install Required Dependencies**
```sh
npm install apollo-server-express express graphql mongoose dotenv
npm install --save-dev @types/express @types/graphql
```

### **2.3 Create Folder Structure**
```
graphql-crud/
│── graphql/
│   ├── resolvers.ts
│   ├── typeDefs.ts
│── models/
│   ├── User.ts
│── .env
│── index.ts
│── package.json
│── tsconfig.json
```

---

## **3. Setting Up Express and Apollo Server**
### **3.1 `index.ts` - Main Server File**
```ts
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/graphqlCRUD")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
}

startServer();
```
### **Explanation**
- Initializes an **Express** app.
- Connects to **MongoDB** using **Mongoose**.
- Sets up **Apollo Server** for handling **GraphQL requests**.
- Starts the server on **port 4000**.

---

## **4. Define GraphQL Schema**
### **4.1 `graphql/typeDefs.ts` - GraphQL Type Definitions**
```ts
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): String
  }
`;

export default typeDefs;
```
### **Explanation**
- **`User`** type defines a **User model** with fields **id, name, email, and age**.
- **Queries**
  - `getUsers`: Fetches all users.
  - `getUser(id: ID!)`: Fetches a single user by ID.
- **Mutations**
  - `createUser`: Creates a new user.
  - `updateUser`: Updates an existing user.
  - `deleteUser`: Deletes a user.

---

## **5. Define Mongoose Model**
### **5.1 `models/User.ts` - User Model**
```ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
```
### **Explanation**
- Defines a **Mongoose schema** for the **User** model.
- Specifies **name, email, and age** fields.
- Uses **TypeScript interfaces** for type safety.

---

## **6. Implement Resolver Logic**
### **6.1 `graphql/resolvers.ts` - Resolver Functions**
```ts
import User from "../models/User";

const resolvers = {
  Query: {
    async getUsers() {
      return await User.find();
    },
    async getUser(_: any, { id }: { id: string }) {
      return await User.findById(id);
    },
  },

  Mutation: {
    async createUser(_: any, { name, email, age }: { name: string; email: string; age?: number }) {
      const newUser = new User({ name, email, age });
      return await newUser.save();
    },
    
    async updateUser(_: any, { id, name, email, age }: { id: string; name?: string; email?: string; age?: number }) {
      return await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    },

    async deleteUser(_: any, { id }: { id: string }) {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default resolvers;
```
### **Explanation**
- **Queries**
  - `getUsers()`: Fetches all users from MongoDB.
  - `getUser(id)`: Fetches a user by ID.
- **Mutations**
  - `createUser(name, email, age)`: Creates a new user and saves it in MongoDB.
  - `updateUser(id, name, email, age)`: Updates an existing user's details.
  - `deleteUser(id)`: Deletes a user by ID.

---

## **7. Environment Configuration**
### **7.1 `.env` - MongoDB Connection**
```
MONGO_URI=mongodb://localhost:27017/graphqlCRUD
```
### **7.2 Load Environment Variables in `index.ts`**
```ts
dotenv.config();
```

---

## **8. Running the Server**
### **8.1 Add Script in `package.json`**
```json
"scripts": {
  "start": "ts-node index.ts"
}
```
### **8.2 Start the Server**
```sh
npm start
```
- Server runs at **`http://localhost:4000/graphql`**.

---

## **9. Testing CRUD Operations**
### **9.1 Create a User**
```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com", age: 30) {
    id
    name
    email
  }
}
```
### **9.2 Get All Users**
```graphql
query {
  getUsers {
    id
    name
    email
  }
}
```
### **9.3 Get a Single User**
```graphql
query {
  getUser(id: "USER_ID_HERE") {
    name
    email
  }
}
```
### **9.4 Update a User**
```graphql
mutation {
  updateUser(id: "USER_ID_HERE", name: "Jane Doe", email: "jane@example.com") {
    id
    name
    email
  }
}
```
### **9.5 Delete a User**
```graphql
mutation {
  deleteUser(id: "USER_ID_HERE")
}
```

Here’s the **full code** for your GraphQL API in **Node.js with TypeScript and Apollo Server** that demonstrates **query arguments for filtering data**.

---

## **1️⃣ Install Dependencies**
Run the following command to install all necessary packages:

```sh
npm init -y
npm install apollo-server graphql
npm install --save-dev @types/graphql @types/node ts-node typescript
```

---

## **2️⃣ Project Structure**
```
/graphql-api
  ├── /src
  │   ├── schema.ts
  │   ├── resolvers.ts
  │   ├── types.ts
  │   ├── server.ts
  ├── package.json
  ├── tsconfig.json
```

---

## **3️⃣ Define GraphQL Schema (`schema.ts`)**
Create a schema that includes query arguments for filtering books.

```ts
import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books(title: String, author: String): [Book]
  }
`;
```
- Defines a `books` query that takes **optional** `title` and `author` arguments.

---

## **4️⃣ Define TypeScript Types (`types.ts`)**
This ensures proper type safety in our resolvers.

```ts
export type Book = {
  id: string;
  title: string;
  author: string;
};

export type QueryResolvers = {
  books: (_: any, args: { title?: string; author?: string }) => Book[];
};

export type Resolvers = {
  Query: QueryResolvers;
};
```
- **Book Type**: Represents the book data structure.
- **QueryResolvers**: Defines resolver function types.

---

## **5️⃣ Implement Resolvers (`resolvers.ts`)**
This file contains the logic to filter books based on query arguments.

```ts
import { Resolvers } from "./types";

const books = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "3", title: "1984", author: "George Orwell" },
];

export const resolvers: Resolvers = {
  Query: {
    books: (_, args) => {
      let result = books;

      if (args.title) {
        result = result.filter(book =>
          book.title.toLowerCase().includes(args.title.toLowerCase())
        );
      }

      if (args.author) {
        result = result.filter(book =>
          book.author.toLowerCase().includes(args.author.toLowerCase())
        );
      }

      return result;
    },
  },
};
```
- Filters books **dynamically** based on the `title` and `author` arguments.

---

## **6️⃣ Create Apollo Server (`server.ts`)**
Now, create the Apollo Server and run it.

```ts
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```
- Starts Apollo Server.
- Logs the server URL.

---

## **7️⃣ Configure TypeScript (`tsconfig.json`)**
Create a TypeScript config file to enable TypeScript support.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

---

## **8️⃣ Run the GraphQL Server**
Start the server with:

```sh
npx ts-node src/server.ts
```

You should see:

```
🚀 Server ready at http://localhost:4000
```

---

## **9️⃣ Test in GraphQL Playground**
Open [http://localhost:4000](http://localhost:4000) and test queries.

### **Query 1: Get All Books**
```graphql
query {
  books {
    id
    title
    author
  }
}
```

### **Query 2: Filter by Title**
```graphql
query {
  books(title: "1984") {
    id
    title
    author
  }
}
```

### **Query 3: Filter by Author**
```graphql
query {
  books(author: "Harper Lee") {
    id
    title
    author
  }
}
```

---

## **✅ Summary**
✔ **GraphQL Schema** with arguments (`title`, `author`)  
✔ **Resolvers** that filter data dynamically  
✔ **Apollo Server** setup with TypeScript  
✔ **Test queries in GraphQL Playground**  

---

## **🔥 Next Steps**
- Integrate with **MongoDB** or **PostgreSQL** for real-time data.
- Add **pagination** (`limit`, `offset`).
- Implement **authentication** with JWT.

Let me know if you need more help! 🚀

### If we want or gate 

To use **OR (`||`)** instead of **AND (`&&`)** while filtering books, update your resolver logic like this:

### **Updated Resolvers (`resolvers.ts`)**
```ts
import { Resolvers } from "./types";

const books = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "3", title: "1984", author: "George Orwell" },
];

export const resolvers: Resolvers = {
  Query: {
    books: (_, args) => {
      return books.filter((book) => {
        return (
          (args.id && book.id.toLowerCase().includes(args.id.toLowerCase())) ||
          (args.title &&
            book.title.toLowerCase().includes(args.title.toLowerCase())) ||
          (args.author &&
            book.author.toLowerCase().includes(args.author.toLowerCase()))
        );
      });
    },
  },
};
```

### **Changes Made:**
1. Used `.filter()` only **once** and applied the `OR` (`||`) condition inside it.
2. Now, if **any** of the conditions match (`id`, `title`, or `author`), the book is **included** in the result.
3. Ensured it checks for **each argument separately**.

---

### **Example Queries & Results**
#### **Query 1: Find by Title OR Author**
```graphql
query {
  books(title: "1984", author: "Harper Lee") {
    id
    title
    author
  }
}
```
**Returns:**
```json
[
  {
    "id": "2",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee"
  },
  {
    "id": "3",
    "title": "1984",
    "author": "George Orwell"
  }
]
```

#### **Query 2: Find by ID OR Title**
```graphql
query {
  books(id: "1", title: "Mockingbird") {
    id
    title
    author
  }
}
```
**Returns:**
```json
[
  {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  },
  {
    "id": "2",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee"
  }
]
```
---

### **✅ Summary**
✔ **Uses OR (`||`) logic** instead of AND (`&&`).  
✔ **Filters books based on `id`, `title`, or `author`** independently.  
✔ **Returns books if at least one condition matches.**  

Let me know if you need any changes! 🚀


Great! Optimizing GraphQL queries using **Aliases** and **Fragments** in a **Node.js TypeScript Apollo Server** setup involves structuring your queries to be more efficient and reusable.

---

## **1. Understanding Aliases and Fragments**
- **Aliases:** Help rename fields in the response to prevent conflicts when querying the same field multiple times with different arguments.
- **Fragments:** Allow reusability by defining shared parts of a query.

---

## **2. Setting Up GraphQL with Apollo Server in Node.js and TypeScript**
If you haven’t already set up Apollo Server with TypeScript, follow these steps:

### **Install dependencies**
```sh
npm init -y
npm install apollo-server graphql
npm install --save-dev @types/graphql
```

### **Create an Apollo Server**
Create a file **`server.ts`**:

```typescript
import { ApolloServer, gql } from "apollo-server";

// Define Type Definitions (Schema)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    allUsers: [User!]!
  }
`;

// Sample Data
const users = [
  { id: "1", name: "Alice", age: 25, email: "alice@example.com" },
  { id: "2", name: "Bob", age: 30, email: "bob@example.com" },
];

// Define Resolvers
const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) => users.find((user) => user.id === id),
    allUsers: () => users,
  },
};

// Create and Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

---

## **3. Using GraphQL Aliases**
Aliases help rename fields when querying the same field multiple times with different arguments.

### **Example Query Using Aliases**
```graphql
query {
  alice: getUser(id: "1") {
    name
    email
  }
  bob: getUser(id: "2") {
    name
    email
  }
}
```

### **Response**
```json
{
  "data": {
    "alice": {
      "name": "Alice",
      "email": "alice@example.com"
    },
    "bob": {
      "name": "Bob",
      "email": "bob@example.com"
    }
  }
}
```
**💡 Benefits:**  
- Avoids conflicts when querying the same field multiple times.
- Helps rename fields in a meaningful way.

---

## **4. Using GraphQL Fragments**
Fragments allow reusing query structures across multiple queries.

### **Defining a Fragment**
```graphql
query {
  allUsers {
    ...UserDetails
  }
}

fragment UserDetails on User {
  name
  age
  email
}
```

### **Response**
```json
{
  "data": {
    "allUsers": [
      {
        "name": "Alice",
        "age": 25,
        "email": "alice@example.com"
      },
      {
        "name": "Bob",
        "age": 30,
        "email": "bob@example.com"
      }
    ]
  }
}
```

**💡 Benefits:**  
- Reduces query repetition.
- Makes queries cleaner and more modular.

---

## **5. Combining Aliases and Fragments**
You can use both together to optimize complex queries.

### **Example Query**
```graphql
query {
  alice: getUser(id: "1") {
    ...UserDetails
  }
  bob: getUser(id: "2") {
    ...UserDetails
  }
}

fragment UserDetails on User {
  name
  age
  email
}
```

### **Response**
```json
{
  "data": {
    "alice": {
      "name": "Alice",
      "age": 25,
      "email": "alice@example.com"
    },
    "bob": {
      "name": "Bob",
      "age": 30,
      "email": "bob@example.com"
    }
  }
}
```

---

## **6. Running the Server and Testing Queries**
1. Run the Apollo Server:
   ```sh
   npx ts-node server.ts
   ```
2. Open **http://localhost:4000** and use Apollo Explorer or Postman to test the queries.

---

## **7. Best Practices for GraphQL Optimization**
✅ Use **Aliases** to avoid conflicts when querying the same field with different parameters.  
✅ Use **Fragments** to create reusable parts of queries.  
✅ Optimize **Resolvers** to avoid over-fetching data.  
✅ Use **Batching and Caching** (e.g., DataLoader) for performance improvement.  


### GraphQL Nested Queries
Since you want to use **MongoDB** instead of mock data, we will modify our implementation to fetch users and posts from a **MongoDB database**.

---

## **1. Install Dependencies**
Run the following command to install the necessary packages:

```sh
npm install apollo-server graphql mongoose dotenv
npm install --save-dev typescript ts-node nodemon @types/node
```

---

## **2. Set Up MongoDB Connection**
Create a `.env` file to store your **MongoDB connection string**:

```env
MONGO_URI=mongodb://localhost:27017/graphql_db
```

Now, create a **database connection file**.

### **Create `db.ts`**
```ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
```

---

## **3. Define MongoDB Models**
Instead of mock data, we will now use **MongoDB schemas** for Users and Posts.

### **Create `models/User.ts`**
```ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const UserModel = mongoose.model("User", UserSchema);
```

---

### **Create `models/Post.ts`**
```ts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const PostModel = mongoose.model("Post", PostSchema);
```

---

## **4. Define GraphQL Schema**
We define the schema using **SDL**.

### **Create `schema.ts`**
```ts
import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!): User!
    createPost(title: String!, content: String!, userId: ID!): Post!
  }
`;
```

---

## **5. Define Resolvers**
Now, we create resolvers that **fetch data from MongoDB** instead of using mock data.

### **Create `resolvers.ts`**
```ts
import { UserModel } from "./models/User";
import { PostModel } from "./models/Post";

export const resolvers = {
  Query: {
    getUsers: async () => await UserModel.find(),
    getUser: async (_: any, { id }: { id: string }) => await UserModel.findById(id),
    getPosts: async () => await PostModel.find(),
    getPost: async (_: any, { id }: { id: string }) => await PostModel.findById(id),
  },

  User: {
    posts: async (parent: any) => await PostModel.find({ userId: parent.id }), // Fetch posts related to the user
  },

  Post: {
    user: async (parent: any) => await UserModel.findById(parent.userId), // Fetch user for a post
  },

  Mutation: {
    createUser: async (_: any, { name }: { name: string }) => {
      const newUser = new UserModel({ name });
      return await newUser.save();
    },
    createPost: async (_: any, { title, content, userId }: { title: string, content: string, userId: string }) => {
      const newPost = new PostModel({ title, content, userId });
      return await newPost.save();
    },
  },
};
```

---

## **6. Set Up Apollo Server**
Now, set up **Apollo Server** with MongoDB.

### **Create `index.ts`**
```ts
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDB } from "./db";

const startServer = async () => {
  await connectDB(); // Connect to MongoDB

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
```

---

## **7. Run the Server**
Make sure MongoDB is running on your local machine. Then, start the server:

```sh
npx ts-node index.ts
```

If MongoDB is **not running**, start it using:

```sh
mongod --dbpath /data/db
```

---

## **8. Test Queries in GraphQL Playground**
Go to **http://localhost:4000** and run the following queries.

### **Create a User**
```graphql
mutation {
  createUser(name: "Alice") {
    id
    name
  }
}
```

### **Create a Post**
```graphql
mutation {
  createPost(title: "GraphQL Basics", content: "Introduction to GraphQL", userId: "USER_ID_HERE") {
    id
    title
    content
  }
}
```
Replace `"USER_ID_HERE"` with the actual `id` of the user created earlier.

### **Fetch Users and Their Posts**
```graphql
query {
  getUsers {
    id
    name
    posts {
      id
      title
      content
    }
  }
}
```

### **Fetch Posts and Their Users**
```graphql
query {
  getPosts {
    id
    title
    content
    user {
      id
      name
    }
  }
}
```

---

## **Summary**
✅ **Connected MongoDB to GraphQL using Mongoose**  
✅ **Created `User` and `Post` models**  
✅ **Implemented resolvers that fetch data from the database**  
✅ **Handled nested queries for `User.posts` and `Post.user`**  
✅ **Added `Mutation` to create users and posts**  


## Task 10 
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


## Task 11 : Enum and Unions 
Great! You're diving into some advanced GraphQL concepts like Enum and Union Types. I'll guide you through how to define and use both of these types in a GraphQL schema using Node.js, Apollo Server, and TypeScript.

### Enum Types

An **Enum** in GraphQL is a special kind of scalar that defines a set of possible values. It is useful when you want to constrain a field to only allow a specific set of values.

### Union Types

A **Union** type in GraphQL allows a field to return one of many different types, but the types don't need to be related in any way. This is useful when you want to return different types of data from a field depending on the query.

### Step-by-Step Code Example

#### 1. Install Dependencies

Before we start, you need to install the following dependencies in your project:

```bash
npm install apollo-server graphql
npm install --save-dev typescript @types/node ts-node
```

- **apollo-server**: Provides the Apollo Server framework to run the GraphQL API.
- **graphql**: The GraphQL runtime.
- **typescript**: For TypeScript support.
- **@types/node**: TypeScript types for Node.js.
- **ts-node**: Allows you to run TypeScript code directly without compiling.

#### 2. Create Your TypeScript Configuration File (`tsconfig.json`)

Create a `tsconfig.json` file for TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

#### 3. Create the GraphQL Schema (`schema.ts`)

Now, let's define the **Enum** and **Union** types in your GraphQL schema.

```typescript
import { gql } from 'apollo-server';

// Define Enum Type
const typeDefs = gql`
  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
  }

  # Union Type: It can be one of the following types
  union SearchResult = Book | Author

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Author {
    id: ID!
    name: String!
  }

  type Query {
    getStatus: Status
    search(query: String!): [SearchResult]
  }
`;

export default typeDefs;
```

### Explanation:
- **Enum Type `Status`**: This restricts the `Status` to only three possible values: `PENDING`, `IN_PROGRESS`, and `COMPLETED`.
- **Union Type `SearchResult`**: This allows a field (`search`) to return either a `Book` or an `Author` depending on the query result.
- **`Book` and `Author`**: These are two separate types that can be returned in the `SearchResult` union type.

#### 4. Create Resolvers (`resolvers.ts`)

Resolvers are where we define how the data for our schema fields should be fetched or resolved.

```typescript
const resolvers = {
  Query: {
    getStatus: () => {
      return 'PENDING'; // Returns a value from the Status enum
    },
    search: (_: any, { query }: { query: string }) => {
      // Example search function, returns different data based on the query.
      const books = [
        { id: '1', title: 'GraphQL Guide', author: 'John Doe' },
        { id: '2', title: 'Learning TypeScript', author: 'Jane Smith' },
      ];
      const authors = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ];

      if (query === 'book') {
        return books;
      } else if (query === 'author') {
        return authors;
      }
      return [];
    },
  },
  // This is a Union resolver. It tells Apollo how to resolve the union types.
  SearchResult: {
    __resolveType(obj: any) {
      if (obj.title) {
        return 'Book'; // Return Book type
      }
      if (obj.name) {
        return 'Author'; // Return Author type
      }
      return null; // For undefined cases
    },
  },
};

export default resolvers;
```

### Explanation:
- **Resolvers for `Query`**: 
  - `getStatus` returns one of the values defined in the `Status` enum (`PENDING`, `IN_PROGRESS`, or `COMPLETED`).
  - `search` performs a mock search based on the input query. If the query is "book", it returns a list of books; if it's "author", it returns a list of authors.
- **Union Resolver**: The `__resolveType` function tells Apollo Server how to resolve which type (either `Book` or `Author`) is returned based on the data. If the object has a `title`, it’s resolved as a `Book`, and if it has a `name`, it’s resolved as an `Author`.

#### 5. Set Up Apollo Server (`index.ts`)

Now, let's set up the Apollo Server to serve your GraphQL API.

```typescript
import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

### Explanation:
- The `ApolloServer` is instantiated with the `typeDefs` (GraphQL schema) and `resolvers` (logic for resolving the schema fields).
- The server will listen for requests and provide an endpoint where you can access your GraphQL API.

#### 6. Run the Server

Now that we’ve set up everything, you can run your Apollo Server using the following command:

```bash
npx ts-node src/index.ts
```

### Example Queries

- **Query the Enum Type (`getStatus`)**:

```graphql
query {
  getStatus
}
```

This will return one of the enum values, like:

```json
{
  "data": {
    "getStatus": "PENDING"
  }
}
```

- **Search for Books or Authors (`search`)**:

```graphql
query {
  search(query: "book") {
    ... on Book {
      title
      author
    }
    ... on Author {
      name
    }
  }
}
```

This will return either a list of `Book` objects or `Author` objects, depending on the query:

```json
{
  "data": {
    "search": [
      {
        "title": "GraphQL Guide",
        "author": "John Doe"
      },
      {
        "title": "Learning TypeScript",
        "author": "Jane Smith"
      }
    ]
  }
}
```

#### 7. Final Notes:
- **Enum Types**: You define a limited set of possible values that can be used in your GraphQL API.
- **Union Types**: These are useful when a field can return more than one possible type, and you need to resolve which type is returned dynamically based on the data.

This should give you a solid foundation for working with **Enum** and **Union** types in GraphQL with Apollo Server and TypeScript.


## Task 12 
Sure! Let's go over how to implement **Interfaces in GraphQL** in Node.js with TypeScript using Apollo Server. We'll cover:

- What is an interface in GraphQL.
- How to define an interface in GraphQL schema.
- How to implement interfaces in GraphQL types.
- How to set this up in a Node.js + TypeScript project using Apollo Server.

### What is an Interface in GraphQL?

In GraphQL, an **Interface** is a type that defines a set of fields that other types can implement. It allows you to create a contract between types, ensuring that they share certain fields.

For example, you might have an `Animal` interface with fields `name` and `age`, and then have types like `Dog` and `Cat` that implement this interface and add their own specific fields.

### Setup and Code Implementation

Let's implement this step-by-step in a Node.js + TypeScript + Apollo Server application.

### Step 1: Create a New Node.js Project with TypeScript

1. First, create a new directory for your project and initialize it.

```bash
mkdir graphql-interface-example
cd graphql-interface-example
npm init -y
```

2. Install the necessary dependencies.

```bash
npm install apollo-server graphql
npm install --save-dev typescript @types/node
```

3. Create a `tsconfig.json` file.

```bash
npx tsc --init
```

Ensure the `tsconfig.json` file looks like this (ensure `esModuleInterop` and `skipLibCheck` are set to true):

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```

### Step 2: Implement GraphQL Schema with Interfaces

Now, create a file `src/schema.ts` to define the GraphQL schema, types, and interfaces.

```typescript
import { gql } from 'apollo-server';

// Define the Interface
export const typeDefs = gql`
  interface Animal {
    name: String!
    age: Int!
  }

  type Dog implements Animal {
    name: String!
    age: Int!
    breed: String!
  }

  type Cat implements Animal {
    name: String!
    age: Int!
    color: String!
  }

  type Query {
    getAnimals: [Animal!]!
  }
`;
```

### Step 3: Implement Resolvers for the Interface and Types

Now, create a file `src/resolvers.ts` where you’ll implement the resolvers.

```typescript
export const resolvers = {
  // Resolve the interface Animal
  Animal: {
    __resolveType(obj: any) {
      if (obj.breed) {
        return 'Dog'; // if breed is present, return Dog
      }
      if (obj.color) {
        return 'Cat'; // if color is present, return Cat
      }
      return null;
    },
  },

  Query: {
    getAnimals: () => {
      // Sample data
      return [
        {
          name: 'Buddy',
          age: 4,
          breed: 'Golden Retriever',
        },
        {
          name: 'Whiskers',
          age: 3,
          color: 'Black',
        },
      ];
    },
  },
};
```

### Step 4: Set Up Apollo Server

Create a file `src/index.ts` to set up the Apollo Server and integrate it with the schema and resolvers.

```typescript
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

### Step 5: Run the Server

Before running the project, let's add a script in `package.json` to run the TypeScript code.

```json
{
  "scripts": {
    "start": "ts-node src/index.ts"
  }
}
```

Finally, run the server:

```bash
npm run start
```

### Testing the GraphQL Interface

Now that the server is running, you can test the GraphQL schema using Apollo's playground (usually available at `http://localhost:4000/`).

You can query the GraphQL server with a query like this:

```graphql
query {
  getAnimals {
    name
    age
    ... on Dog {
      breed
    }
    ... on Cat {
      color
    }
  }
}
```

### Expected Result:

```json
{
  "data": {
    "getAnimals": [
      {
        "name": "Buddy",
        "age": 4,
        "breed": "Golden Retriever"
      },
      {
        "name": "Whiskers",
        "age": 3,
        "color": "Black"
      }
    ]
  }
}
```

### Explanation:

- **Interface**: We define an `Animal` interface that includes `name` and `age`. Both `Dog` and `Cat` types implement this interface, so they are required to have those fields.
- **Resolvers**: The `__resolveType` function within the `Animal` interface resolver tells GraphQL which type to resolve (`Dog` or `Cat`) based on the fields in the returned object.
- **Query**: The `getAnimals` query fetches an array of animals, and we can use GraphQL fragments (`... on Dog` and `... on Cat`) to query type-specific fields (`breed` for `Dog` and `color` for `Cat`).

### Step 6: Conclusion

In this implementation:

- We defined an interface (`Animal`) that both `Dog` and `Cat` implement.
- We used Apollo Server with TypeScript to serve the GraphQL schema.
- The interface is resolved based on the fields present in the response (`breed` or `color`).

This allows you to abstract common fields (like `name` and `age`) while still having specific fields (`breed`, `color`) for different types. The interface ensures that all types implementing it share common fields, making your schema more reusable and structured.


## Where to use 
The use of **Interfaces** in GraphQL can be very powerful, especially when you want to share common fields between different types but also allow for type-specific fields. This is particularly useful in cases where your GraphQL schema involves multiple types that share certain common properties, but also need their own unique fields.

Let’s break down some real-world scenarios where you might want to use **Interfaces** in GraphQL, as illustrated in the example with `Animal`, `Dog`, and `Cat`.

### Scenario 1: Unified Query with Shared and Specific Fields

In real-world applications, you often have different types of entities that share common attributes but have their own specific properties. GraphQL interfaces help you create queries that are flexible and can return data from multiple types while ensuring consistency in the fields that are common across them.

#### Use Case:
Imagine you're building an application that fetches information about different animals (e.g., pets or wildlife). Each animal has a common set of attributes like `name` and `age`, but different animal species may have different attributes. For example:

- **Dog** has a `breed`.
- **Cat** has a `color`.

You can use an interface to define the common fields (`name` and `age`) while allowing each specific type (`Dog`, `Cat`) to add its own unique attributes (`breed`, `color`).

#### Why Use an Interface:
- **Abstracting Common Fields**: The `Animal` interface abstracts away the `name` and `age` fields so that you don't have to define them in every type like `Dog` and `Cat`.
- **Flexible Queries**: With an interface, you can define a unified query (`getAnimals`) that returns animals, regardless of whether they are dogs, cats, or other types. The result is a list of animals that share common fields (like `name` and `age`), but you can use inline fragments (`... on Dog`, `... on Cat`) to access type-specific fields (`breed`, `color`).

### Scenario 2: Handling Different Product Types in an E-Commerce Platform

Imagine you're building an **e-commerce platform** that sells different types of products. Each product type shares some common fields (like `id`, `name`, `price`), but they also have product-specific fields.

#### Use Case:
You might have different product types, like:

- **Electronics**: These might have a `warrantyPeriod`.
- **Clothing**: These might have a `size` and `color`.
- **Furniture**: These might have `dimensions` and `material`.

In this case, the `Product` interface can define the common fields (`id`, `name`, `price`), and the specific product types (`Electronics`, `Clothing`, `Furniture`) can implement this interface and add their own unique fields.

#### GraphQL Schema Example:
```graphql
interface Product {
  id: ID!
  name: String!
  price: Float!
}

type Electronics implements Product {
  id: ID!
  name: String!
  price: Float!
  warrantyPeriod: Int!
}

type Clothing implements Product {
  id: ID!
  name: String!
  price: Float!
  size: String!
  color: String!
}

type Furniture implements Product {
  id: ID!
  name: String!
  price: Float!
  dimensions: String!
  material: String!
}

type Query {
  getProducts: [Product!]!
}
```

#### Why Use an Interface:
- **Avoid Redundant Field Definitions**: You don't need to repeat the common fields (`id`, `name`, `price`) for each product type. The `Product` interface abstracts that.
- **Unified Query**: A single `getProducts` query will return all product types (electronics, clothing, furniture), and clients can request common fields and use inline fragments to fetch type-specific fields.
- **Scalability**: As new product types are added (e.g., `Books`, `Toys`), you don’t need to modify the entire query structure—just define the new product types implementing the `Product` interface.

### Scenario 3: Organizing Complex GraphQL APIs in a Content Management System (CMS)

In a **Content Management System (CMS)**, content items like `Articles`, `Blogs`, and `News` may share certain fields (like `title`, `author`, `publishedDate`), but each type may also have additional specific fields.

#### Use Case:
You might have content items like:

- **Article**: Has a `category` and `tags`.
- **Blog**: Has a `readTime` and `comments`.
- **News**: Has a `source` and `location`.

#### Why Use an Interface:
- **Data Consistency**: The common fields (`title`, `author`, `publishedDate`) are abstracted in the `Content` interface, reducing duplication across content types.
- **Efficient Queries**: You can query all content types in one go using `getContents`, while also using inline fragments to access type-specific fields. This can be helpful for rendering the right content in the UI.

### Scenario 4: Polymorphism in GraphQL APIs

Polymorphism is a concept where different object types are treated as instances of the same interface or base class. GraphQL interfaces support polymorphism by allowing you to return different types that implement the same interface.

#### Use Case:
In a **social media platform**, you could have posts with multiple types:

- **TextPost**: Contains `content` (text).
- **ImagePost**: Contains `imageUrl` and `caption`.
- **VideoPost**: Contains `videoUrl` and `duration`.

You could define a `Post` interface that ensures all posts share common fields (`id`, `author`, `timestamp`), but each post type can add its own unique fields.

#### GraphQL Schema Example:
```graphql
interface Post {
  id: ID!
  author: String!
  timestamp: String!
}

type TextPost implements Post {
  id: ID!
  author: String!
  timestamp: String!
  content: String!
}

type ImagePost implements Post {
  id: ID!
  author: String!
  timestamp: String!
  imageUrl: String!
  caption: String!
}

type VideoPost implements Post {
  id: ID!
  author: String!
  timestamp: String!
  videoUrl: String!
  duration: Int!
}

type Query {
  getPosts: [Post!]!
}
```

#### Why Use an Interface:
- **Abstract Common Fields**: The `Post` interface ensures all posts have the same fields (`id`, `author`, `timestamp`).
- **Return Mixed Types**: The `getPosts` query can return an array of mixed post types (text, image, video). Using inline fragments in queries allows clients to request type-specific fields based on the actual post type (`content`, `imageUrl`, `videoUrl`).

### Conclusion: When to Use Interfaces in GraphQL

Here’s a quick summary of scenarios where interfaces are useful in GraphQL:

1. **Unified Queries for Multiple Types**: When you have multiple types with some shared fields, but each type also has its own unique fields. You can query them all using a single unified query.
   
2. **Abstracting Common Fields**: When several types share common fields but you don’t want to repeat those fields in every type definition. Interfaces help define common fields centrally.

3. **Polymorphism**: When you need to treat different object types as instances of the same base type, but each type has additional fields. This is often useful in complex systems like content management or e-commerce.

4. **Scalability and Extensibility**: When you need to add new types that should share common fields but also have their own unique fields. You don’t need to rewrite the schema or queries, just add new types that implement the interface.

Interfaces make GraphQL schemas more modular, reusable, and maintainable, while also allowing flexibility for handling different object types that share a common contract.


## Types of resolving 
Great question! Let's dive deeper into how the **resolvers** work with interfaces in GraphQL and whether you need to use `if` statements or conditionals like in the first example.

### Resolving Types in GraphQL Interfaces

In GraphQL, when you define an **Interface**, you also need to tell GraphQL how to resolve which specific **type** an interface instance should be mapped to during the execution of the query. This is done through the `__resolveType` function in the resolver for the interface.

In the previous example, I used an `if-else` statement in the `__resolveType` function to distinguish between `Dog` and `Cat` based on the presence of specific fields (`breed` or `color`). This was just one way to do it. Let's break down some alternative ways to handle this and explain when and why you might need or not need conditionals.

### Option 1: Using `__resolveType` with `if-else` Conditions

The method used in the first example checks which fields exist on the object and returns the appropriate type. Here’s the same example with the `if-else` statements for clarity:

#### Example (First Approach - with `if-else`):
```typescript
export const resolvers = {
  Animal: {
    // __resolveType tells GraphQL which type to resolve based on the data received
    __resolveType(obj: any) {
      if (obj.breed) {
        return 'Dog'; // if the object has the 'breed' field, it must be a 'Dog'
      }
      if (obj.color) {
        return 'Cat'; // if the object has the 'color' field, it must be a 'Cat'
      }
      return null; // if no matching fields, return null (this shouldn't happen if your data is correct)
    },
  },

  Query: {
    getAnimals: () => {
      return [
        { name: 'Buddy', age: 4, breed: 'Golden Retriever' },
        { name: 'Whiskers', age: 3, color: 'Black' },
      ];
    },
  },
};
```

### Explanation of the `__resolveType` Method:
- `__resolveType` is a function where you can check the fields of the object and return the appropriate GraphQL type.
- **`if-else` or other conditionals** are used to inspect which fields are available on the object and then map it to the corresponding type (`Dog`, `Cat`, etc.).
  
This method is necessary when you have to decide dynamically which type to resolve based on the data returned from the database or API.

### Option 2: Using Type Guards or Helper Functions (Avoiding `if-else` directly)

While `if-else` is straightforward and effective for small applications, in larger systems, it can get messy. In those cases, you might want to abstract your type resolution logic into helper functions or use **type guards** to make the code more maintainable and readable.

#### Example (Abstracting Type Resolution Logic):
```typescript
export const resolvers = {
  Animal: {
    __resolveType(obj: any) {
      if (isDog(obj)) {
        return 'Dog';
      }
      if (isCat(obj)) {
        return 'Cat';
      }
      return null;
    },
  },

  Query: {
    getAnimals: () => {
      return [
        { name: 'Buddy', age: 4, breed: 'Golden Retriever' },
        { name: 'Whiskers', age: 3, color: 'Black' },
      ];
    },
  },
};

// Type guards to simplify type resolution
function isDog(obj: any): obj is { breed: string } {
  return obj.breed !== undefined;
}

function isCat(obj: any): obj is { color: string } {
  return obj.color !== undefined;
}
```

### Explanation:
- **Type Guards**: We created `isDog` and `isCat` functions. These functions check if an object has a specific field (`breed` for `Dog`, `color` for `Cat`). This is more scalable and readable than using `if-else` directly.
- **Avoiding Complex Logic**: As your types grow and become more complex, this kind of abstraction can make your code cleaner and easier to maintain.

### Option 3: Relying on GraphQL Tools (Less Manual Work)

If you're using a **static schema** where the types are predictable and you don’t need dynamic type resolution, you can sometimes avoid manually defining `__resolveType`. This is common when you know the types ahead of time and have simpler schemas.

For example, if all your types have a fixed structure and you don’t need to distinguish them at runtime (e.g., you have a simple object type with no polymorphism), GraphQL can usually infer the type without the need for an explicit `__resolveType` method.

### Example (Static Case - No `__resolveType`):

```typescript
export const resolvers = {
  Query: {
    getAnimals: () => [
      { name: 'Buddy', age: 4, breed: 'Golden Retriever' },
      { name: 'Whiskers', age: 3, color: 'Black' },
    ],
  },
};
```

In this example, we don't need `__resolveType` because the types are self-explanatory (based on the query's structure).

### Option 4: Using Union Types Instead of Interfaces

In some cases, instead of using interfaces, you might choose to use **union types**. A union type is a more flexible way of defining multiple possible types for a field. Unlike an interface, a union type doesn't require implementing common fields—it simply allows the field to be one of several types.

#### Example (Using a Union Type):
```graphql
union Animal = Dog | Cat

type Dog {
  name: String!
  age: Int!
  breed: String!
}

type Cat {
  name: String!
  age: Int!
  color: String!
}

type Query {
  getAnimals: [Animal!]!
}
```

In this case, you can resolve a union type without needing `__resolveType`, because GraphQL will automatically determine which type to return based on the shape of the data.

```typescript
export const resolvers = {
  Query: {
    getAnimals: () => [
      { name: 'Buddy', age: 4, breed: 'Golden Retriever' },
      { name: 'Whiskers', age: 3, color: 'Black' },
    ],
  },

  Animal: {
    __resolveType(obj: any) {
      if (obj.breed) {
        return 'Dog';
      }
      if (obj.color) {
        return 'Cat';
      }
      return null;
    },
  },
};
```

### Conclusion: When Do You Need `if-else` or `__resolveType`?

- **Yes, You Need `__resolveType`**:
  - When you have **interface-based polymorphism** where you need to dynamically resolve types based on the shape of the data (e.g., distinguishing between `Dog` and `Cat`).
  - This is common when the fields vary between types (e.g., `breed` vs. `color`), and you can't know the type upfront.
  
- **No, You Don’t Always Need `if-else`**:
  - If your types have clear, predictable fields, you can use **type guards** or helper functions to keep the resolver code clean.
  - For static types or schemas where the types don’t need complex resolution, GraphQL may handle type resolution for you.

Using `if-else` statements is not inherently bad, but for larger schemas with many types, you should consider abstracting the logic into helper functions or type guards. This will make your code cleaner, more maintainable, and easier to scale.