import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI } = process.env;
console.log("MONGODB_URI", MONGODB_URI);
export const connectToDB = async () => {
  try {
    mongoose.connection.on("error", (error) => {
      console.error("Failed to connect to MongoDB:", error);
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
