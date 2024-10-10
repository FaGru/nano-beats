// import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./user/user.routes";
import errorHandler from "./middleware/errorMiddleware";
const colors = require("colors") as any;
import connectDB from "./config/db";

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
