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

