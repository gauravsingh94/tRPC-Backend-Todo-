import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Error while connecting to database.", error);
  }
};
