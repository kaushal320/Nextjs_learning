import mongoose from "mongoose";
export async function connectToDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI! || "";
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
