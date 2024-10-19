import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./user/user.routes";
import connectDB from "./config/db";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
