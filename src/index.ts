import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { json } from "body-parser";
import { createWriteStream } from "fs";
import path from "path";
import { finished } from "stream/promises";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose File Schema
const FileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    path: String,
});
const File = mongoose.model("File", FileSchema);

// Define GraphQL Schema
const typeDefs = gql`
  scalar Upload

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type Query {
    files: [File]
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

// Define GraphQL Resolvers
const resolvers = {
    Query: {
        files: async () => await File.find(),
    },
    Mutation: {
        uploadFile: async (_: any, { file }: any) => {
            const { createReadStream, filename, mimetype } = await file;
            const uploadPath = path.join(__dirname, "../uploads", filename);

            const stream = createReadStream();
            const out = createWriteStream(uploadPath);
            stream.pipe(out);
            await finished(out);

            const uploadedFile = new File({ filename, mimetype, path: uploadPath });
            await uploadedFile.save();

            return uploadedFile;
        },
    },
};

// Create Apollo Server **with CSRF protection disabled**
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
    schema,
    csrfPrevention: false, // ✅ FIXES CSRF ERROR
});

async function startServer() {
    await server.start();

    const app = express();
    app.use(json());

    // Multer for File Upload Handling
    const upload = multer({ dest: "uploads/" });
    app.use(upload.single("file"));

    app.use("/graphql", expressMiddleware(server));

    app.listen(process.env.PORT || 4000, () => {
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}/graphql`);
    });
}

startServer();
