import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { customerRouter } from "./routes/customerRouter.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter.js";
import { agentRouter } from "./routes/agentRouter.js";
import { AdRouter } from "./routes/ADRouter.js";

// import multer from "multer";

export const app = express();
app.use(express.json());
dotenv.config({ path: "./src/.env" });
app.use(cookieParser());
export const upload = multer({
  dest: "uploads/", // Temporary folder for file uploads
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/agent", AdRouter);


app.listen(4000, () => console.log("port is running on 4k"));
