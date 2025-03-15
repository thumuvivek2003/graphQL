import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";
import File from "../models/File";

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    files: async () => {
      return await File.find();
    },
  },

  Mutation: {
    uploadFile: async (_: any, { file }: any) => {
      const { createReadStream, filename, mimetype } = await file;

      // Define upload path
      const uploadPath = path.join(__dirname, "../../uploads", filename);

      // Save file to local filesystem
      await new Promise((resolve, reject) => {
        const stream = createReadStream();
        stream
          .pipe(createWriteStream(uploadPath))
          .on("finish", resolve)
          .on("error", reject);
      });

      // Save file info to MongoDB
      const newFile = new File({ filename, mimetype, path: uploadPath });
      await newFile.save();

      return newFile;
    },
  },
};

export default resolvers;
