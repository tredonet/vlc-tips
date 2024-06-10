import mongoose, { Document, model, Schema } from "mongoose";
import { User as _User } from "@/types";

interface IUser extends _User, Document {}

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

export const User = mongoose.models.User || model<IUser>("User", UserSchema);

