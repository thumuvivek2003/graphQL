import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: mongoose.Schema.Types.ObjectId, // Reference to User
});

export const Post = mongoose.model("Post", postSchema);
