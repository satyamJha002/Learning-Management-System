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

app.get("/", (req, res) =>
  res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel")
);

app.use(
  cors({
    origin: "https://learning-management-system-o6dm.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", adminRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Backend server is start ${PORT}`);
});
