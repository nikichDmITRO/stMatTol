import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import fileUpload from "express-fileupload";
const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(fileUpload())
app.use(express.json());
app.use(express.static("uploads"))

//Routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.t5wl1g2.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Сервер стартовал на порту: ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
