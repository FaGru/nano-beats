import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./user/user.routes";
import connectDB from "./config/db";
import "colors";
import cors from "cors";

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
