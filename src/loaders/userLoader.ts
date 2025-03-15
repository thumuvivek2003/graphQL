import DataLoader from "dataloader";
import { User } from "../models/User";
import mongoose from "mongoose";

const userLoader = new DataLoader(
  async (userIds: mongoose.Types.ObjectId[]) => {
    const users = await User.find({ _id: { $in: userIds } });
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    return userIds.map((id) => userMap.get(id.toString()));
  }
);

export default userLoader;
