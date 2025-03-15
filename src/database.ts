import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/graphQL");
  console.log("MongoDB Connected");
};
