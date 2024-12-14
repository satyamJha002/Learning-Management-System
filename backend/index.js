import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { connectToDB } from "./database/connectToDb.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";

configDotenv();

const PORT = process.env.PORT || 4000;

connectToDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api", adminRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Backend server is start ${PORT}`);
});
