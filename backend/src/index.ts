import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./user/user.routes";
import connectDB from "./config/db";
import "colors";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
  origin: ["https://nano-beats.vercel.app", "http://localhost:8000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
