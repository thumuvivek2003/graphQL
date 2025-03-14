// src/models/UserModel.ts
import { Schema, model, Document } from "mongoose";

// Define User TypeScript Interface
interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

// Define the Mongoose Schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create the model
const User = model<IUser>("User", userSchema);

export { User, IUser };
