import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb is connected to server");
  } catch (error) {
    console.log(`Erros in connection to mongodb`, error.message);
  }
};
