import mongoose, { Document, Model, Types } from "mongoose";

export interface UserType extends Document {
  _id: string;
  username: string;
  password: string;
  todos: Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

export const User: Model<UserType> = mongoose.model<UserType>(
  "User",
  UserSchema
);
